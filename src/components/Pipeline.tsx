const STEPS = [
  {
    step: "01",
    title: "Source ingestion",
    body: "Drop transcripts, video audio, or source materials into a NotebookLM source folder.",
  },
  {
    step: "02",
    title: "Deep synthesis",
    body: "Generate thematic notes — audience blind spots, tonal friction, and disconnect moments.",
  },
  {
    step: "03",
    title: "Structure & pivot",
    body: "Paste raw notes into Orator Lab. The app maps them into actionable adjustments.",
  },
  {
    step: "04",
    title: "Speech blueprint",
    body: "Export a scannable view of The Disconnect vs. The Empathetic Pivot.",
  },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="border-b border-border/40 bg-ink-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-serif text-3xl text-text sm:text-4xl">
          NotebookLM → Orator Lab
        </h2>
        <p className="mt-3 max-w-2xl text-text-muted">
          A human-in-the-loop pipeline: deep synthesis from your sources, then a
          speech-centric presentation layer.
        </p>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.step}
              className="relative rounded-xl border border-border bg-surface p-6"
            >
              {i < STEPS.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden h-px w-6 bg-border lg:block"
                  aria-hidden
                />
              )}
              <span className="font-mono text-xs text-accent">{s.step}</span>
              <h3 className="mt-2 font-medium text-text">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
