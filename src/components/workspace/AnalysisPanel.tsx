import { useCallback, useState } from "react";
import type { Improvement } from "../../data/schmidtExample";
import { PILLARS, type PillarId } from "../../data/schmidtExample";

interface AnalysisPanelProps {
  improvement: Improvement | undefined;
  activeIndex: number;
  total: number;
}

export function AnalysisPanel({
  improvement,
  activeIndex,
  total,
}: AnalysisPanelProps) {
  const [copied, setCopied] = useState(false);

  const copyPivot = useCallback(async () => {
    if (!improvement) return;
    try {
      await navigator.clipboard.writeText(improvement.pivot);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard denied */
    }
  }, [improvement]);

  if (!improvement) {
    return (
      <aside className="flex h-full min-h-[200px] flex-col rounded-xl border border-dashed border-border bg-surface/50 p-5 lg:sticky lg:top-20 lg:min-h-[420px]">
        <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
          Analysis
        </p>
        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          Select a highlighted passage in the transcript or a friction point
          under the video to see the disconnect and empathetic pivot.
        </p>
      </aside>
    );
  }

  const pillar = PILLARS[improvement.pillar as PillarId];

  return (
    <aside
      className="flex h-full flex-col rounded-xl border border-border bg-surface lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:min-h-[420px]"
      aria-live="polite"
    >
      <div className="border-b border-border px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Analysis
          </h3>
          <span className="font-mono text-[10px] text-text-muted">
            {activeIndex + 1} of {total}
          </span>
        </div>
        <span
          className="mt-2 inline-block rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider"
          style={{ borderColor: pillar.color, color: pillar.color }}
        >
          {pillar.label}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-5">
        <article>
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-friction">
            The disconnect
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {improvement.disconnect}
          </p>
        </article>

        <article className="flex-1">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-pivot">
            Empathetic pivot
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-text">
            {improvement.pivot}
          </p>
        </article>
      </div>

      <div className="border-t border-border p-4 sm:p-5">
        <button
          type="button"
          onClick={copyPivot}
          className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-accent-dim"
        >
          {copied ? "Copied!" : "Copy pivot"}
        </button>
      </div>
    </aside>
  );
}
