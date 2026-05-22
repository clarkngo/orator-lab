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

export interface CaseStudy {
  id: string;
  video: {
    youtubeId: string;
    durationSeconds: number;
    title: string;
    subtitle: string;
    sourceUrl: string;
  };
  transcript: TranscriptSegment[];
  improvements: Improvement[];
}

export const PILLARS: Record<
  PillarId,
  {
    label: string;
    short: string;
    railLabel: string;
    color: string;
  }
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

export function videoStartSeconds(caseStudy: CaseStudy): number {
  return Math.min(...caseStudy.transcript.map((s) => s.startSeconds));
}
