import { CASE_VIDEO, PILLARS } from "../data/schmidtExample";
import { transcriptInVideoOrder } from "../lib/transcriptOrder";

export function CaseStudyPreview() {
  return (
    <section
      id="example"
      className="border-y border-border/40 bg-ink-muted/30 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-serif text-3xl text-text sm:text-4xl">
          Case study: {CASE_VIDEO.title}
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          {CASE_VIDEO.subtitle}. Click any highlighted moment in the workspace to
          see the disconnect and an empathetic pivot.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {transcriptInVideoOrder().map((seg) => (
            <li key={seg.id}>
              <span
                className="inline-block rounded-full border border-border px-3 py-1 text-xs font-mono"
                style={{
                  borderColor: PILLARS[seg.pillar].color,
                  color: PILLARS[seg.pillar].color,
                }}
              >
                {PILLARS[seg.pillar].label}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <a
            href="#workspace"
            className="text-accent underline-offset-4 hover:underline"
          >
            Open full analysis in workspace →
          </a>
        </p>
      </div>
    </section>
  );
}
