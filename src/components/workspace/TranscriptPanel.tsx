import { useEffect, useMemo, useRef } from "react";
import { PILLARS, type TranscriptSegment } from "../../data/cases";
import { transcriptInVideoOrder } from "../../lib/transcriptOrder";

interface TranscriptPanelProps {
  segments: readonly TranscriptSegment[];
  activeId: string;
  onSelect: (segment: TranscriptSegment) => void;
}

export function TranscriptPanel({
  segments,
  activeId,
  onSelect,
}: TranscriptPanelProps) {
  const ordered = useMemo(() => transcriptInVideoOrder(segments), [segments]);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeId]);

  return (
    <div className="flex h-full min-h-[280px] flex-col rounded-xl border border-border bg-surface lg:min-h-[420px]">
      <div className="border-b border-border px-4 py-3 sm:px-5">
        <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">
          Transcript
        </h3>
        <p className="mt-0.5 text-xs text-text-muted">
          Passages follow clip order (same as friction points below the video).
        </p>
      </div>
      <div
        className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5"
        role="listbox"
        aria-label="Speech transcript"
      >
        <p className="text-base leading-[1.85] text-text-muted">
          {ordered.map((seg, index) => {
            const isActive = seg.id === activeId;
            const pillar = PILLARS[seg.pillar];
            return (
              <span key={seg.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  ref={isActive ? activeRef : undefined}
                  onClick={() => onSelect(seg)}
                  className={`mx-0.5 inline rounded px-1 py-0.5 text-left transition ${
                    isActive
                      ? "bg-surface-raised text-text ring-1 ring-accent/40"
                      : "text-text/90 hover:bg-surface-raised/60 hover:text-text"
                  }`}
                  style={
                    isActive
                      ? {
                          boxDecorationBreak: "clone",
                          WebkitBoxDecorationBreak: "clone",
                          borderBottom: `2px solid ${pillar.color}`,
                        }
                      : {
                          boxDecorationBreak: "clone",
                          WebkitBoxDecorationBreak: "clone",
                          borderBottom: `1px solid color-mix(in srgb, ${pillar.color} 35%, transparent)`,
                        }
                  }
                >
                  {seg.text}
                </button>
                {index < ordered.length - 1 ? " " : null}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}
