import type { TranscriptSegment } from "../data/types";

/** Segments sorted by when they appear in the clip (left → right in the rail). */
export function transcriptInVideoOrder(
  segments: readonly TranscriptSegment[],
): TranscriptSegment[] {
  return [...segments].sort((a, b) => a.startSeconds - b.startSeconds);
}

/** 0-based index in video order (for "2 / 4" progress). */
export function videoOrderIndex(
  segmentId: string,
  segments: readonly TranscriptSegment[],
): number {
  return transcriptInVideoOrder(segments).findIndex((s) => s.id === segmentId);
}
