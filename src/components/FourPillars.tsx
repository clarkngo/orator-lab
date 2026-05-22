import { PILLARS, type PillarId } from "../data/cases";

const PILLAR_ORDER: PillarId[] = [
  "accountability",
  "anxiety",
  "power",
  "narrative",
];

export function FourPillars() {
  return (
    <section id="pillars" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-serif text-3xl text-text sm:text-4xl">
          Four rhetorical pillars
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          Messy NotebookLM notes get sorted into the communication patterns that
          make or break audience trust.
        </p>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {PILLAR_ORDER.map((id) => {
            const p = PILLARS[id];
            return (
              <li
                key={id}
                className="rounded-xl border border-border bg-surface-raised p-6 transition hover:border-border/80"
                style={{ borderLeftWidth: 3, borderLeftColor: p.color }}
              >
                <h3 className="font-medium text-text">{p.label}</h3>
                <p className="mt-1 text-sm text-text-muted">{p.short}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
