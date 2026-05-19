import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CASE_VIDEO,
  IMPROVEMENTS,
  TRANSCRIPT,
  VIDEO_START_SECONDS,
  type TranscriptSegment,
} from "../data/schmidtExample";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";
import { segmentAtTime } from "../lib/segmentAtTime";
import { videoOrderIndex } from "../lib/transcriptOrder";
import { AnalysisPanel } from "./workspace/AnalysisPanel";
import { ImportNotesPanel } from "./workspace/ImportNotesPanel";
import {
  MobileWorkspaceTabs,
  type WorkspaceTab,
} from "./workspace/MobileWorkspaceTabs";
import {
  loadReadOnlyPreference,
  ReadModeToggle,
  saveReadOnlyPreference,
} from "./workspace/ReadModeToggle";
import { TranscriptPanel } from "./workspace/TranscriptPanel";
import { VideoColumn } from "./workspace/VideoColumn";

function paneClass(tab: WorkspaceTab, pane: WorkspaceTab) {
  return pane === tab ? "block" : "hidden lg:block";
}

const SYNC_SUPPRESS_MS = 900;

export function Workspace() {
  const [activeId, setActiveId] = useState<string>(() =>
    segmentAtTime(VIDEO_START_SECONDS, TRANSCRIPT).id,
  );
  const [mobileTab, setMobileTab] = useState<WorkspaceTab>("watch");
  const [importOpen, setImportOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(loadReadOnlyPreference);
  const suppressSyncRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePlaybackTime = useCallback((seconds: number) => {
    if (suppressSyncRef.current) return;
    const seg = segmentAtTime(seconds, TRANSCRIPT);
    setActiveId((current) => (current === seg.id ? current : seg.id));
  }, []);

  const { containerRef, seekTo } = useYouTubePlayer(
    CASE_VIDEO.youtubeId,
    VIDEO_START_SECONDS,
    CASE_VIDEO.durationSeconds,
    handlePlaybackTime,
  );

  const activeIndex = useMemo(
    () => videoOrderIndex(activeId),
    [activeId],
  );

  const activeImprovement = useMemo(
    () => IMPROVEMENTS.find((i) => i.segmentId === activeId),
    [activeId],
  );

  useEffect(() => {
    saveReadOnlyPreference(readOnly);
  }, [readOnly]);

  const selectSegment = useCallback(
    (seg: TranscriptSegment) => {
      setActiveId(seg.id);
      if (readOnly) return;

      if (suppressTimerRef.current) {
        clearTimeout(suppressTimerRef.current);
      }
      suppressSyncRef.current = true;
      seekTo(seg.startSeconds);
      suppressTimerRef.current = setTimeout(() => {
        suppressSyncRef.current = false;
      }, SYNC_SUPPRESS_MS);
    },
    [readOnly, seekTo],
  );

  const handleTranscriptSelect = useCallback(
    (seg: TranscriptSegment) => {
      selectSegment(seg);
      if (window.matchMedia("(max-width: 1023px)").matches) {
        setMobileTab("fix");
      }
    },
    [selectSegment],
  );

  return (
    <section id="workspace" className="scroll-mt-16 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl text-text">Workspace</h2>
            <p className="mt-1 max-w-xl text-sm text-text-muted">
              Tri-pane review: watch the moment, read it in context, apply the
              pivot — friction points stay in sync with playback.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setImportOpen((o) => !o)}
            className="shrink-0 self-start rounded-full border border-border px-4 py-2 text-sm text-text-muted transition hover:border-accent hover:text-accent sm:self-auto"
            aria-expanded={importOpen}
          >
            {importOpen ? "Hide import" : "Import notes"}
          </button>
        </div>

        <ImportNotesPanel open={importOpen} onClose={() => setImportOpen(false)} />

        <MobileWorkspaceTabs active={mobileTab} onChange={setMobileTab} />

        <div className="mb-4">
          <ReadModeToggle readOnly={readOnly} onChange={setReadOnly} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)_minmax(280px,320px)] lg:gap-5 xl:gap-6">
          <div className={`${paneClass(mobileTab, "watch")} lg:sticky lg:top-20 lg:self-start`}>
            <VideoColumn
              playerContainerRef={containerRef}
              activeId={activeId}
              onSelectSegment={selectSegment}
            />
          </div>

          <div className={paneClass(mobileTab, "read")}>
            <TranscriptPanel
              activeId={activeId}
              onSelect={handleTranscriptSelect}
            />
          </div>

          <div className={paneClass(mobileTab, "fix")}>
            <AnalysisPanel
              improvement={activeImprovement}
              activeIndex={activeIndex}
              total={TRANSCRIPT.length}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
