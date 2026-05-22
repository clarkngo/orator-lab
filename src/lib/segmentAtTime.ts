import type { TranscriptSegment } from "../data/types";

/** Map playback position to the active friction-point segment. */
export function segmentAtTime(
  seconds: number,
  segments: readonly TranscriptSegment[],
): TranscriptSegment {
  const sorted = [...segments].sort(
    (a, b) => a.startSeconds - b.startSeconds,
  );
  let active = sorted[0];
  for (const seg of sorted) {
    if (seconds >= seg.startSeconds - 0.25) {
      active = seg;
    } else {
      break;
    }
  }
  return active;
}
