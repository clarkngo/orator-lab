import type { RefObject } from "react";
import type { CaseStudy, TranscriptSegment } from "../../data/cases";
import { IssueRail } from "./IssueRail";

interface VideoColumnProps {
  caseStudy: CaseStudy;
  playerContainerRef: RefObject<HTMLDivElement | null>;
  activeId: string;
  onSelectSegment: (segment: TranscriptSegment) => void;
}

export function VideoColumn({
  caseStudy,
  playerContainerRef,
  activeId,
  onSelectSegment,
}: VideoColumnProps) {
  const { video } = caseStudy;

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="aspect-video w-full bg-ink-muted">
          <div ref={playerContainerRef} className="h-full w-full" />
        </div>
        <div className="border-t border-border px-4 py-3">
          <p className="font-medium text-text">{video.title}</p>
          <p className="text-sm text-text-muted">{video.subtitle}</p>
          <a
            href={video.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-xs text-accent hover:underline"
          >
            Watch on YouTube ↗
          </a>
        </div>
      </div>
      <IssueRail
        segments={caseStudy.transcript}
        activeId={activeId}
        onSelect={onSelectSegment}
      />
    </div>
  );
}
