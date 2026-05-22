import { PILLARS, type TranscriptSegment } from "../../data/cases";
import {
  transcriptInVideoOrder,
  videoOrderIndex,
} from "../../lib/transcriptOrder";

interface IssueRailProps {
  segments: readonly TranscriptSegment[];
  activeId: string;
  onSelect: (segment: TranscriptSegment) => void;
}

export function IssueRail({ segments, activeId, onSelect }: IssueRailProps) {
  const ordered = transcriptInVideoOrder(segments);
  const activeIndex = videoOrderIndex(activeId, segments);

  return (
    <nav aria-label="Friction points" className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
          Friction points
        </span>
        <span className="font-mono text-[10px] text-text-muted">
          {activeIndex + 1} / {ordered.length}
        </span>
      </div>
      <ol className="flex gap-2">
        {ordered.map((seg, index) => {
          const isActive = seg.id === activeId;
          const pillar = PILLARS[seg.pillar];
          return (
            <li key={seg.id} className="flex-1">
              <button
                type="button"
                onClick={() => onSelect(seg)}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${pillar.railLabel}: ${pillar.label}, moment ${index + 1} in clip`}
                title={pillar.label}
                className={`flex w-full flex-col items-center gap-1 rounded-lg border px-1 py-2 text-center transition ${
                  isActive
                    ? "border-accent/50 bg-surface-raised"
                    : "border-border bg-ink-muted/40 hover:border-text-muted/40"
                }`}
              >
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full font-mono text-xs font-medium"
                  style={{
                    backgroundColor: isActive
                      ? `color-mix(in srgb, ${pillar.color} 25%, transparent)`
                      : "transparent",
                    color: pillar.color,
                  }}
                >
                  {index + 1}
                </span>
                <span
                  className="hidden text-[9px] leading-tight sm:block"
                  style={{ color: isActive ? pillar.color : undefined }}
                >
                  {pillar.railLabel}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
