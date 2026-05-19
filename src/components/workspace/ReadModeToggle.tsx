const STORAGE_KEY = "orator-lab-read-only";

export function loadReadOnlyPreference(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function saveReadOnlyPreference(readOnly: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, String(readOnly));
  } catch {
    /* private browsing */
  }
}

interface ReadModeToggleProps {
  readOnly: boolean;
  onChange: (readOnly: boolean) => void;
}

export function ReadModeToggle({ readOnly, onChange }: ReadModeToggleProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm transition hover:border-border/80">
      <input
        type="checkbox"
        checked={readOnly}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 size-4 shrink-0 accent-accent"
      />
      <span>
        <span className="font-medium text-text">Read-only mode</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-text-muted">
          Selecting friction points updates the transcript and analysis only —
          the video won&apos;t play or seek.
        </span>
      </span>
    </label>
  );
}
