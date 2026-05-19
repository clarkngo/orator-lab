interface ImportNotesPanelProps {
  open: boolean;
  onClose: () => void;
}

export function ImportNotesPanel({ open, onClose }: ImportNotesPanelProps) {
  if (!open) return null;

  return (
    <div
      className="mb-6 rounded-xl border border-border bg-surface-raised p-4 sm:p-5"
      role="region"
      aria-label="Import NotebookLM notes"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
            Import notes
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Paste NotebookLM exports to start a new analysis. Mapping is not
            enabled yet — this is the ingest step, separate from review.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg border border-border px-2 py-1 text-xs text-text-muted transition hover:text-text"
          aria-label="Close import panel"
        >
          Close
        </button>
      </div>
      <label htmlFor="notes-paste" className="sr-only">
        NotebookLM notes
      </label>
      <textarea
        id="notes-paste"
        rows={5}
        placeholder="Paste exported NotebookLM notes here…"
        className="mt-4 w-full resize-y rounded-lg border border-border bg-ink px-3 py-2 font-mono text-sm text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none"
        disabled
      />
      <p className="mt-2 text-xs text-text-muted">
        Auto-mapping from pasted notes is coming in a future release.
      </p>
    </div>
  );
}
