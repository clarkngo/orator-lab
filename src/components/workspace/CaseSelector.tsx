import { CASE_STUDIES, type CaseStudy } from "../../data/cases";

interface CaseSelectorProps {
  activeCase: CaseStudy;
  onChange: (caseId: string) => void;
}

export function CaseSelector({ activeCase, onChange }: CaseSelectorProps) {
  return (
    <div className="mb-4">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        Case study
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {CASE_STUDIES.map((c) => {
          const isActive = c.id === activeCase.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onChange(c.id)}
              aria-pressed={isActive}
              className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                isActive
                  ? "border-accent/60 bg-surface-raised text-text"
                  : "border-border bg-surface text-text-muted hover:border-text-muted/50 hover:text-text"
              }`}
            >
              <span className="font-medium">{c.video.title}</span>
              <span className="mt-0.5 block text-xs text-text-muted">
                {c.video.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
