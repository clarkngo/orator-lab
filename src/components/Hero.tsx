export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, color-mix(in srgb, var(--color-accent) 25%, transparent), transparent)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Speech refinement · audience alignment
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] text-text sm:text-5xl lg:text-6xl">
          Turn rhetorical friction into{" "}
          <em className="text-accent">empathetic pivots</em>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
          Orator Lab maps NotebookLM synthesis into structured delivery
          blueprints — video, transcript, and side-by-side fixes for where a
          speaker loses the room.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#workspace"
            className="rounded-full bg-accent px-6 py-3 font-medium text-ink transition hover:bg-accent-dim"
          >
            Try the workspace
          </a>
          <a
            href="#pipeline"
            className="rounded-full border border-border px-6 py-3 text-text-muted transition hover:border-text-muted hover:text-text"
          >
            See the workflow
          </a>
        </div>
      </div>
    </section>
  );
}
