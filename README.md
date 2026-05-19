# Orator Lab 🎙️🔬

Orator Lab is a specialized speech refinement interface designed to transform raw rhetorical data into actionable delivery blueprints. Built for speech coaches, communication strategists, and executives, the platform maps complex thematic critiques into structured, empathetic public speaking frameworks.

## 🚀 The Core Philosophy
Great speaking isn't just about flawless delivery; it's about audience alignment. Orator Lab analyzes speech drafts or past performances to detect where a speaker might be disconnecting from their listeners—whether through a power imbalance, over-indexing on individual burden, or dismissing rational anxieties.

## 🛠️ How It Works: A Case Study (Eric Schmidt at MIT)
To understand Orator Lab's analytical engine, look at how it deconstructs and provides actionable improvements for high-stakes presentations, such as Eric Schmidt's address on the future of AI:

1. **Shifting from Agency to Accountability**
   * *The Critique:* The speaker acknowledges a "mess" but immediately pivots to lecturing the audience about not surrendering their individual agency.
   * *The Lab's Fix:* Recommend shifting the burden from a solo graduate requirement to a collaborative partnership, acknowledging the responsibility of current tech leaders.

2. **Validating Concerns Over "Algorithmic" Dismissal**
   * *The Critique:* Attributing audience anxiety largely to social media algorithms can come across as dismissing deep-seated, valid fears (job loss, climate change) as mere engagement metrics.
   * *The Lab's Fix:* Guide the speaker to focus on concrete solutions the technology offers for those specific crises, rather than critiquing how the audience consumes information.

3. **Addressing Power Imbalances Directly**
   * *The Critique:* Telling a room of graduates that AI will "touch every profession" while standing as an industry titan can sound like a threat rather than an invitation.
   * *The Lab's Fix:* Provide actionable phrasing to explain how AI will *augment* and empower their specific careers, rather than just "disrupting" them.

4. **Tempering the "Architect" Narrative**
   * *The Critique:* Leading with self-congratulatory industry accolades risks alienating an audience that feels victimized by those exact systems.
   * *The Lab's Fix:* Pivot the framing from a finished structure built by elite "architects" to an open-source tool that the audience has the power to redesign.

## ✨ Features
* **Resonance Auditing:** Flags tone mismatch, elitism, or unintended friction points before you step on stage.
* **Empathetic Pivot Suggestions:** Automatically generates constructive re-phrasings to make calls-to-action feel inclusive rather than lecturing.
* **Structural Deconstruction:** Breaks speeches down by thematic weight to ensure you spend time solving anxieties rather than just identifying them.

## ⚙️ Architecture & Data Flow

Orator Lab leverages **NotebookLM** as its core analytical synthesis engine, transforming raw audio transcripts and source documents into structured rhetorical insights.

## 🛠️ The Workflow: NotebookLM ➔ Orator Lab

Orator Lab uses a human-in-the-loop data pipeline that pairs the deep synthesis capabilities of NotebookLM with a tailored, speech-centric presentation layer.

 ┌────────────────────────────────────────┐
 │ 1. Source Ingestion (NotebookLM)       │ -> Drop transcripts, video audio, or source
 └───────────────────┬────────────────────┘    materials into a NotebookLM source folder.
                     │
                     ▼
 ┌────────────────────────────────────────┐
 │ 2. Deep Synthesis (NotebookLM)         │ -> Generate deep thematic notes, identifying
 └───────────────────┬────────────────────┘    audience blind spots and tonal friction.
                     │
                     ▼  [Export / Copy Notes]
 ┌────────────────────────────────────────┐
 │ 3. Structure & Pivot (Orator Lab)      │ -> Paste raw notes into Orator Lab. The app
 └───────────────────┬────────────────────┘    instantly maps them into actionable adjustments.
                     │
                     ▼
 ┌────────────────────────────────────────┐
 │ 4. Refined Speech Blueprint            │ -> Output a scannable, side-by-side view of
 └────────────────────────────────────────┘    "The Disconnect" vs. "The Empathetic Pivot".

## ✨ Key Interface Features

*   **Zero-Config Ingestion Pasteboard:** A clean, markdown-aware input area built to accept raw markdown exports directly from your NotebookLM study guides or chat logs.
*   **Rhetorical Category Mapping:** Automatically categorizes messy, long-form analytical notes into four core communication pillars:
    *   *Accountability Realignment* (Is the speaker lecturing or partnering?)
    *   *Anxiety Validation* (Is the speaker dismissing real fears with sterile data?)
    *   *Power Dynamics Balancing* (Is the language empowering or intimidating?)
    *   *Narrative Democratization* (Is the framing elitist or collaborative?)
*   **Before/After Split View:** Displays the exact moment of audience friction alongside a concrete rewrite suggestion, making it trivial for a speaker to rebuild their script.

## 🌐 Web app & GitHub Pages

The home page and interactive workspace live in this repo as a static Vite + React app.

```bash
npm install
npm run dev      # local preview at http://localhost:5173/orator-lab/
npm run build    # output in dist/
```

**Deploy:** Push to `main`. The [Deploy to GitHub Pages](.github/workflows/deploy.yml) workflow builds and publishes automatically. In the repo **Settings → Pages**, set **Source** to **GitHub Actions**.

Site URL (project page): `https://<username>.github.io/orator-lab/`

Workspace UI decisions are documented in [docs/lessons-learned-workspace-ui.md](docs/lessons-learned-workspace-ui.md).

## 🚀 Getting Started

1. Analyze your target speech video or transcript inside **NotebookLM**.
2. Run a prompt to isolate audience friction points (e.g., *"Identify where the speaker's tone alienates the audience"*).
3. Copy the exported notes, open **Orator Lab**, and paste them into the analyzer workspace.
4. Export your structured, high-impact speech blueprint.
