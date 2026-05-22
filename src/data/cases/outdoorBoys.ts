import type { CaseStudy } from "../types";

/**
 * Luke Nichols (Outdoor Boys) — George Mason Antonin Scalia Law School, 2026.
 * @see https://youtu.be/ttQd5bEdfL0
 * Timestamps are approximate; tune after reviewing the full clip.
 */
export const outdoorBoysCase: CaseStudy = {
  id: "outdoor-boys",
  video: {
    youtubeId: "ttQd5bEdfL0",
    durationSeconds: 530,
    title: "Luke Nichols (Outdoor Boys) — Law school commencement",
    subtitle: "George Mason · Scalia Law School (~9 min)",
    sourceUrl: "https://youtu.be/ttQd5bEdfL0",
  },
  transcript: [
    {
      id: "ob-seg-1",
      pillar: "narrative",
      startSeconds: 0,
      text: "Some people call me a survival expert. Well, as a survival expert, I want to clear up a common misconception. Survival is not something we just do in the woods. Something each and every one of us has to do every single day — whether you're building a fire or gutting a moose or drafting a motion, we're just trying to survive as best as we can with the resources we have.",
    },
    {
      id: "ob-seg-2",
      pillar: "power",
      startSeconds: 132,
      text: "The best, the most important things are often simple but hard to do. Money is freedom. Money is power. Money is flexibility. When change happens, those people who can afford to adapt can prosper and take advantage of those opportunities. And those who cannot afford to be flexible get crushed.",
    },
    {
      id: "ob-seg-3",
      pillar: "anxiety",
      startSeconds: 265,
      text: "I graduated during the 2008 financial crisis. I sent out more than three thousand resumes. I lost my law clerk job before graduation. I spent over a year working for free, pouring thousands into advertising that failed — and on the fourteenth month, it all changed. My firm exploded, and it made my family very well off.",
    },
    {
      id: "ob-seg-4",
      pillar: "accountability",
      startSeconds: 398,
      text: "I cannot honestly say I deserve the success I have. All I can say is that I did not waste the opportunities that were gifted to me. If you are fortunate enough to be given a chance to earn some money and to survive out there, please, please do not waste that opportunity. When you have money in the bank, you have options.",
    },
  ],
  improvements: [
    {
      id: "ob-imp-1",
      pillar: "narrative",
      segmentId: "ob-seg-1",
      disconnect:
        "Framing a formal law commencement through moose-gutting and wilderness survival can read as a novelty act — the metaphor may entertain YouTube fans but can feel tone-deaf to graduates entering a credentialed profession.",
      pivot:
        "Bridge the metaphor to their world first: \"The same discipline you will use writing a motion at 2 a.m. is the discipline I used building a practice from zero — let me show you the parallel in your first year as an attorney.\"",
    },
    {
      id: "ob-imp-2",
      pillar: "power",
      segmentId: "ob-seg-2",
      disconnect:
        "\"Money is power\" from a speaker who later describes becoming \"very well off\" can sound like flexing advantage at an audience carrying six-figure debt — inspiration reads as intimidation.",
      pivot:
        "Name the constraint: \"Many of you are starting with less runway than I had — here are three concrete savings habits that do not require a viral channel, starting with what you can control in month one.\"",
    },
    {
      id: "ob-imp-3",
      pillar: "anxiety",
      segmentId: "ob-seg-3",
      disconnect:
        "A fourteen-month turnaround story after 3,200 resumes can imply that persistence alone guarantees success — which risks dismissing graduates' rational fears about hiring markets, AI, and debt they face now.",
      pivot:
        "Validate the odds: \"My story is not a promise that month fourteen always comes — it is proof that one path existed. Here is how to build a network and financial buffer while you search for yours.\"",
    },
    {
      id: "ob-imp-4",
      pillar: "accountability",
      segmentId: "ob-seg-4",
      disconnect:
        "Repeated pleas not to \"waste\" or \"screw up\" opportunities can land as lecturing — especially when paired with humility disclaimers that still center the speaker's gifted chances.",
      pivot:
        "Partner instead of preach: \"You have already done the hard part — finishing law school in a brutal market. My ask is specific: pick one savings rule this summer, and I will tell you the mistake I made when I did not.\"",
    },
  ],
};
