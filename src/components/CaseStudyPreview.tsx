import { CASE_STUDIES, PILLARS } from "../data/cases";
import { transcriptInVideoOrder } from "../lib/transcriptOrder";

export function CaseStudyPreview() {
  return (
    <section
      id="example"
      className="border-y border-border/40 bg-ink-muted/30 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-serif text-3xl text-text sm:text-4xl">Case studies</h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          Sample analyses you can open in the workspace — select a speech, then
          click any friction point to see the disconnect and an empathetic pivot.
        </p>

        <ul className="mt-10 space-y-8">
          {CASE_STUDIES.map((c) => (
            <li
              key={c.id}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="font-medium text-text">{c.video.title}</h3>
              <p className="mt-1 text-sm text-text-muted">{c.video.subtitle}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {transcriptInVideoOrder(c.transcript).map((seg) => (
                  <li key={seg.id}>
                    <span
                      className="inline-block rounded-full border border-border px-3 py-1 font-mono text-xs"
                      style={{
                        borderColor: PILLARS[seg.pillar].color,
                        color: PILLARS[seg.pillar].color,
                      }}
                    >
                      {PILLARS[seg.pillar].railLabel}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={`#workspace?case=${c.id}`}
                className="mt-4 inline-block text-sm text-accent underline-offset-4 hover:underline"
              >
                Open in workspace →
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
