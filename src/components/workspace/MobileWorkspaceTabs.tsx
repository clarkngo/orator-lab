export type WorkspaceTab = "watch" | "read" | "fix";

const TABS: { id: WorkspaceTab; label: string }[] = [
  { id: "watch", label: "Watch" },
  { id: "read", label: "Read" },
  { id: "fix", label: "Fix" },
];

interface MobileWorkspaceTabsProps {
  active: WorkspaceTab;
  onChange: (tab: WorkspaceTab) => void;
}

export function MobileWorkspaceTabs({
  active,
  onChange,
}: MobileWorkspaceTabsProps) {
  return (
    <div
      className="mb-4 flex rounded-lg border border-border bg-surface p-1 lg:hidden"
      role="tablist"
      aria-label="Workspace views"
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
            active === tab.id
              ? "bg-accent text-ink"
              : "text-text-muted hover:text-text"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
