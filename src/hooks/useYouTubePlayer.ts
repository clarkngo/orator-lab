import { useCallback, useEffect, useRef } from "react";

function loadYouTubeIframeAPI(): Promise<typeof YT> {
  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  return new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      if (window.YT) resolve(window.YT);
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
}

export function useYouTubePlayer(
  videoId: string,
  initialStart: number,
  maxDurationSeconds: number,
  onPlaybackTime: (seconds: number) => void,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const durationRef = useRef(maxDurationSeconds);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onPlaybackTimeRef = useRef(onPlaybackTime);
  onPlaybackTimeRef.current = onPlaybackTime;

  const clampTime = useCallback(
    (seconds: number) => {
      const max = Math.max(1, durationRef.current);
      return Math.min(Math.max(0, seconds), max - 1);
    },
    [],
  );

  const readPlaybackTime = useCallback(() => {
    const player = playerRef.current;
    if (!player?.getCurrentTime) return;
    try {
      onPlaybackTimeRef.current(player.getCurrentTime());
    } catch {
      /* player tearing down */
    }
  }, []);

  const stopPolling = useCallback(() => {
    if (pollRef.current !== null) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  const startPolling = useCallback(() => {
    stopPolling();
    pollRef.current = setInterval(readPlaybackTime, 400);
  }, [readPlaybackTime, stopPolling]);

  useEffect(() => {
    durationRef.current = maxDurationSeconds;
  }, [maxDurationSeconds]);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          start: clampTime(initialStart),
          enablejsapi: 1,
          rel: 0,
          modestbranding: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (event) => {
            try {
              const duration = event.target.getDuration();
              if (duration > 0) durationRef.current = duration;
            } catch {
              /* ignore */
            }
          },
          onStateChange: (event) => {
            const { PlayerState } = YT;
            if (
              event.data === PlayerState.PLAYING ||
              event.data === PlayerState.BUFFERING
            ) {
              startPolling();
              return;
            }

            stopPolling();
            if (
              event.data === PlayerState.PAUSED ||
              event.data === PlayerState.ENDED ||
              event.data === PlayerState.CUED
            ) {
              readPlaybackTime();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      stopPolling();
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [
    videoId,
    initialStart,
    clampTime,
    readPlaybackTime,
    startPolling,
    stopPolling,
  ]);

  const seekTo = useCallback(
    (seconds: number, play = true) => {
      const player = playerRef.current;
      if (!player?.seekTo) return;
      const target = clampTime(seconds);
      player.seekTo(target, true);
      if (play) player.playVideo();
    },
    [clampTime],
  );

  return { containerRef, seekTo };
};
