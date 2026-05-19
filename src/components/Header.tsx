export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#" className="group flex items-baseline gap-2">
          <span className="font-serif text-xl italic text-accent sm:text-2xl">
            Orator
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Lab
          </span>
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="#pipeline"
            className="hidden text-text-muted transition hover:text-text sm:inline"
          >
            Workflow
          </a>
          <a
            href="#pillars"
            className="hidden text-text-muted transition hover:text-text sm:inline"
          >
            Pillars
          </a>
          <a
            href="#example"
            className="hidden text-text-muted transition hover:text-text sm:inline"
          >
            Example
          </a>
          <a
            href="#workspace"
            className="rounded-full bg-accent px-4 py-1.5 font-medium text-ink transition hover:bg-accent-dim"
          >
            Open workspace
          </a>
        </nav>
      </div>
    </header>
  );
}
