export type PillarId =
  | "accountability"
  | "anxiety"
  | "power"
  | "narrative";

export interface TranscriptSegment {
  id: string;
  pillar: PillarId;
  /** YouTube start time in seconds */
  startSeconds: number;
  text: string;
}

export interface Improvement {
  id: string;
  pillar: PillarId;
  segmentId: string;
  disconnect: string;
  pivot: string;
}

export const CASE_VIDEO = {
  youtubeId: "tNH43a1EI7s",
  /** WSJ clip runtime — seeks are clamped to this */
  durationSeconds: 122,
  title: "Eric Schmidt — Commencement address",
  subtitle: "Sample analysis · WSJ clip (~2 min)",
};

export const PILLARS: Record<
  PillarId,
  { label: string; short: string; /** Problem-side label for friction rail */ railLabel: string; color: string }
> = {
  accountability: {
    label: "Accountability realignment",
    short: "Lecturing vs. partnering",
    railLabel: "Lecturing",
    color: "var(--color-pillar-1)",
  },
  anxiety: {
    label: "Anxiety validation",
    short: "Dismissing fears with data",
    railLabel: "Dismissing",
    color: "var(--color-pillar-2)",
  },
  power: {
    label: "Power dynamics balancing",
    short: "Empowering vs. intimidating",
    railLabel: "Intimidating",
    color: "var(--color-pillar-3)",
  },
  narrative: {
    label: "Narrative democratization",
    short: "Elitist vs. collaborative framing",
    railLabel: "Elitist",
    color: "var(--color-pillar-4)",
  },
};

/** Earliest seek point in the WSJ clip (beginning of the edit). */
export const VIDEO_START_SECONDS = 0;

/** Start times aligned to WSJ clip edit order (not speech order). */
export const TRANSCRIPT: TranscriptSegment[] = [
  {
    id: "seg-1",
    pillar: "accountability",
    startSeconds: 82,
    text: "There is a mess out there — and the graduates in this room did not create it. But to speak of the future as though it has already been decided is to surrender the one thing that actually matters. You are surrendering your agency.",
  },
  {
    id: "seg-2",
    pillar: "anxiety",
    startSeconds: 55,
    text: "There is a fear in your generation that the future has already been written. That the machines are coming. That the jobs are evaporating. Much of that anxiety gets fed by algorithms designed to maximize engagement — not truth.",
  },
  {
    id: "seg-3",
    pillar: "power",
    startSeconds: 28,
    text: "Artificial intelligence will touch every profession represented in this stadium. Every field. Every career path you are about to enter. The transformation is not optional — it is already underway.",
  },
  {
    id: "seg-4",
    pillar: "narrative",
    startSeconds: 0,
    text: "Time magazine named the architects of artificial intelligence its person of the year. The future does not simply arrive. It gets built in laboratories, in dormitories, in startups — and the people building it will be you.",
  },
];

export const IMPROVEMENTS: Improvement[] = [
  {
    id: "imp-1",
    pillar: "accountability",
    segmentId: "seg-1",
    disconnect:
      "Acknowledges a \"mess\" but immediately pivots to lecturing graduates about not surrendering agency — shifting burden onto individuals who did not create the systems in question.",
    pivot:
      "Reframe as a shared obligation: \"We — industry leaders and graduates alike — get to shape what comes next. My generation built the platforms; yours will decide the guardrails.\"",
  },
  {
    id: "imp-2",
    pillar: "anxiety",
    segmentId: "seg-2",
    disconnect:
      "Attributes audience anxiety largely to social-media algorithms, which can sound like dismissing job loss and climate fears as mere engagement metrics.",
    pivot:
      "Validate first, then offer substance: \"Your fears about jobs and stability are rational. Here is what AI can concretely help solve in those domains — and where we still need policy, not just product.\"",
  },
  {
    id: "imp-3",
    pillar: "power",
    segmentId: "seg-3",
    disconnect:
      "From the podium, \"AI will touch every profession\" reads as inevitability imposed from above — a threat more than an invitation.",
    pivot:
      "Empower with specificity: \"In your field — whether medicine, law, or the arts — AI can augment the work only you can do. Let me show you one example from a graduate like you.\"",
  },
  {
    id: "imp-4",
    pillar: "narrative",
    segmentId: "seg-4",
    disconnect:
      "Leading with industry accolades and \"architects\" risks alienating listeners who feel subject to systems they did not design.",
    pivot:
      "Democratize the frame: \"This is not a finished cathedral built by a few. It is an open toolkit — and the blueprints are yours to redraw.\"",
  },
];
