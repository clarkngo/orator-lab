# Lessons learned: Workspace UI/UX refactor

**Date:** May 2026  
**Scope:** Orator Lab workspace — from two-column layout to tri-pane review  
**Status:** Implemented

---

## Context

The first workspace used a **video-left / stacked-right** layout: transcript cards, then disconnect/pivot cards, then a pasteboard. It matched the rough “video + text” brief but broke the core user loop:

> Find moment → understand friction → copy the pivot

Improvements lived **below** the transcript, so users scrolled away from the video to see the payoff. Ingest (NotebookLM paste) competed with review in the same column.

---

## What we changed

### 1. Tri-pane review (desktop)

| Column | Role |
|--------|------|
| **Left** | Video + issue rail (numbered friction points) |
| **Center** | Continuous transcript with inline highlights |
| **Right** | Sticky analysis panel (pillar → disconnect → pivot → copy) |

### 2. Separated ingest from review

- **Import notes** is a header toggle, not part of the review column.
- Reinforces the product pipeline: NotebookLM ingest → structured review (see README workflow).

### 3. Mobile: Watch | Read | Fix tabs

- Avoids a long vertical stack (video → transcript → analysis → pasteboard).
- Selecting a transcript segment on mobile switches to **Fix** so the pivot is one tap away.

### 4. YouTube seek without iframe reload

- Embed uses `enablejsapi=1`; segment changes call `seekTo` via `postMessage`.
- Reloading the iframe on every click was jarring and reset player state.

### 5. Primary action on the pivot

- **Copy pivot** in the analysis panel — the outcome coaches and speakers actually want.

---

## UX principles that drove the design

1. **Layout follows the job** — Columns map to watch → read → fix, not “whatever fit in HTML order.”
2. **Keep the payoff visible** — Analysis is sticky on desktop; on mobile it gets its own tab.
3. **One selection, many surfaces** — Issue rail, transcript, and analysis stay in sync.
4. **Continuous transcript > cards** — Speech is one flow; cards felt like a quiz, not a rehearsal tool.
5. **Don’t mix modes** — Ingest and review are different mental models; separate them in the UI.

---

## What worked well

- **Issue rail under the video** — Gives a scannable “4 friction points” index without reading the full transcript.
- **Inline highlights** — Pillar colors double as wayfinding; active segment uses a stronger underline/ring.
- **Progress label** (`2 of 4`) — Cheap affordance for “working through” a speech.
- **Auto-switch to Fix on mobile** — Reduces taps after choosing a passage.

---

## What we’d do next

| Item | Why |
|------|-----|
| Real timeline scrubber | Spatial memory (“agency bit was early”) beats numbered pills alone |
| YouTube IFrame API wrapper | More reliable than raw `postMessage` if embed policies change |
| Keyboard navigation | Arrow keys between friction points for power users |
| Empty default (no selection) | Forces exploration; tradeoff vs. showing sample content immediately |
| Wire import → parse | Close the loop when NotebookLM paste mapping exists |
| `prefers-reduced-motion` | Soften `scrollIntoView` on transcript focus |

---

## Update: Bidirectional video sync (May 2026)

**Problem:** Friction points only drove the video (one-way). Scrubbing or playing the YouTube timeline did not update the active segment.

**Fix:**
- Replaced raw iframe + `postMessage` seek with the **YouTube IFrame API** (`useYouTubePlayer`).
- Poll `getCurrentTime()` while playing; read once on pause/scrub end.
- Map time → segment via `segmentAtTime()` using each segment’s `startSeconds`.
- **Suppress sync** for ~900ms after a UI-driven seek (friction rail / transcript click) to avoid fighting the player.

**Also fixed:** Duplicate desktop + mobile iframes caused seeks to hit a hidden player — consolidated to a single grid with one player mount.

---

## Anti-patterns we avoided

- **Burying analysis under scroll** — The main lesson from v1; don’t repeat it.
- **Reloading embeds on navigation** — Feels broken even when it “works.”
- **Pasteboard in the review column** — Invites users to paste when they should be watching/listening.
- **Duplicate pillar labels** — Was on every transcript card; now only in rail + analysis header.

---

## Technical notes

- Components live under `src/components/workspace/` for a single feature slice.
- `useYouTubeSeek` centralizes embed URL + seek commands.
- Desktop grid: `280px | 1fr | 320px` with sticky video and analysis columns.
- Breakpoint: `lg` (1024px) for tri-pane vs. tabs.

---

## How to validate

1. **Desktop:** Select each issue rail item — video seeks, transcript highlights, analysis updates without full page scroll.
2. **Desktop:** Read transcript while watching — analysis panel stays in view (sticky).
3. **Mobile:** Watch → Read → tap highlight → lands on Fix with pivot visible.
4. **Copy pivot** — Clipboard receives empathetic pivot text; button shows confirmation.
5. **Import notes** — Opens/closes without shifting tri-pane layout below.

---

## References

- Product workflow: [README](../README.md) — NotebookLM → Orator Lab → blueprint
- Implementation: `src/components/Workspace.tsx` and `src/components/workspace/*`
