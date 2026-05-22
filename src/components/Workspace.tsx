import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getCaseById,
  loadCaseId,
  saveCaseId,
  videoStartSeconds,
  type TranscriptSegment,
} from "../data/cases";
import { useYouTubePlayer } from "../hooks/useYouTubePlayer";
import { segmentAtTime } from "../lib/segmentAtTime";
import { videoOrderIndex } from "../lib/transcriptOrder";
import { AnalysisPanel } from "./workspace/AnalysisPanel";
import { CaseSelector } from "./workspace/CaseSelector";
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
  const [caseId, setCaseId] = useState(loadCaseId);
  const activeCase = useMemo(() => getCaseById(caseId), [caseId]);
  const startSeconds = videoStartSeconds(activeCase);

  const [activeId, setActiveId] = useState<string>(() =>
    segmentAtTime(startSeconds, activeCase.transcript).id,
  );
  const [mobileTab, setMobileTab] = useState<WorkspaceTab>("watch");
  const [importOpen, setImportOpen] = useState(false);
  const [readOnly, setReadOnly] = useState(loadReadOnlyPreference);
  const suppressSyncRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    saveCaseId(caseId);
    window.history.replaceState(null, "", `#workspace?case=${caseId}`);
    const seg = segmentAtTime(startSeconds, activeCase.transcript);
    setActiveId(seg.id);
    setMobileTab("watch");
  }, [caseId, activeCase, startSeconds]);

  const handlePlaybackTime = useCallback(
    (seconds: number) => {
      if (suppressSyncRef.current) return;
      const seg = segmentAtTime(seconds, activeCase.transcript);
      setActiveId((current) => (current === seg.id ? current : seg.id));
    },
    [activeCase.transcript],
  );

  const { containerRef, seekTo } = useYouTubePlayer(
    activeCase.video.youtubeId,
    startSeconds,
    activeCase.video.durationSeconds,
    handlePlaybackTime,
  );

  const activeIndex = useMemo(
    () => videoOrderIndex(activeId, activeCase.transcript),
    [activeId, activeCase.transcript],
  );

  const activeImprovement = useMemo(
    () => activeCase.improvements.find((i) => i.segmentId === activeId),
    [activeCase.improvements, activeId],
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

        <CaseSelector activeCase={activeCase} onChange={setCaseId} />

        <MobileWorkspaceTabs active={mobileTab} onChange={setMobileTab} />

        <div className="mb-4">
          <ReadModeToggle readOnly={readOnly} onChange={setReadOnly} />
        </div>

        <div
          key={activeCase.id}
          className="grid gap-6 lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)_minmax(280px,320px)] lg:gap-5 xl:gap-6"
        >
          <div className={`${paneClass(mobileTab, "watch")} lg:sticky lg:top-20 lg:self-start`}>
            <VideoColumn
              caseStudy={activeCase}
              playerContainerRef={containerRef}
              activeId={activeId}
              onSelectSegment={selectSegment}
            />
          </div>

          <div className={paneClass(mobileTab, "read")}>
            <TranscriptPanel
              segments={activeCase.transcript}
              activeId={activeId}
              onSelect={handleTranscriptSelect}
            />
          </div>

          <div className={paneClass(mobileTab, "fix")}>
            <AnalysisPanel
              improvement={activeImprovement}
              activeIndex={activeIndex}
              total={activeCase.transcript.length}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
