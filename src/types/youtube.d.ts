/** Minimal YouTube IFrame API types for player sync. */
declare namespace YT {
  const PlayerState: {
    UNSTARTED: -1;
    ENDED: 0;
    PLAYING: 1;
    PAUSED: 2;
    BUFFERING: 3;
    CUED: 5;
  };

  interface PlayerOptions {
    videoId?: string;
    playerVars?: Record<string, string | number>;
    events?: {
      onReady?: (event: PlayerEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
    };
  }

  interface PlayerEvent {
    target: Player;
  }

  interface OnStateChangeEvent extends PlayerEvent {
    data: number;
  }

  class Player {
    constructor(elementId: HTMLElement | string, options: PlayerOptions);
    seekTo(seconds: number, allowSeekAhead: boolean): void;
    playVideo(): void;
    getCurrentTime(): number;
    getDuration(): number;
    destroy(): void;
  }
}

interface Window {
  YT?: typeof YT;
  onYouTubeIframeAPIReady?: () => void;
}
