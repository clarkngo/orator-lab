import type { RefObject } from "react";
import {
  CASE_VIDEO,
  type TranscriptSegment,
} from "../../data/schmidtExample";
import { IssueRail } from "./IssueRail";

interface VideoColumnProps {
  playerContainerRef: RefObject<HTMLDivElement | null>;
  activeId: string;
  onSelectSegment: (segment: TranscriptSegment) => void;
}

export function VideoColumn({
  playerContainerRef,
  activeId,
  onSelectSegment,
}: VideoColumnProps) {
  return (
    <div className="flex flex-col">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <div className="aspect-video w-full bg-ink-muted">
          <div ref={playerContainerRef} className="h-full w-full" />
        </div>
        <div className="border-t border-border px-4 py-3">
          <p className="font-medium text-text">{CASE_VIDEO.title}</p>
          <p className="text-sm text-text-muted">{CASE_VIDEO.subtitle}</p>
        </div>
      </div>
      <IssueRail activeId={activeId} onSelect={onSelectSegment} />
    </div>
  );
}
