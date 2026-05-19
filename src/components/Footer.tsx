export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-text-muted sm:flex-row sm:px-6">
        <p>
          <span className="font-serif italic text-accent">Orator Lab</span> —
          audience-aligned speech refinement
        </p>
        <p className="font-mono text-xs">
          By Clark Ngo · GitHub Pages · human-in-the-loop with NotebookLM
        </p>
      </div>
    </footer>
  );
}
