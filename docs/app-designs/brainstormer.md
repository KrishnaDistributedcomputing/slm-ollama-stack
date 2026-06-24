# Brainstormer — Design Document

**Route:** `/apps/brainstorm` · **Source:** [brainstorm.tsx](../../frontend/src/routes/apps/brainstorm.tsx) · **Icon:** `Lightbulb`

## Purpose

Generate fresh, diverse ideas around any topic or problem, fully offline.

## How AI is used

A **divergent ideation** app. The model is cast as a creative brainstorming
partner and asked for 8–10 ideas that are explicitly **diverse, original, and
actionable**, each formatted as a bold title plus a one-line explanation. The
emphasis on diversity counters the tendency of small models to produce
near-duplicate suggestions.

- **Technique:** divergent generation with diversity + format constraints.
- **Input:** a topic or problem statement.
- **Output:** 8–10 titled idea bullets.

## System prompt

```text
You are a creative brainstorming partner. Given the user's topic or problem,
generate 8-10 diverse, original, and actionable ideas. Format each as a short
bullet with a bold title and a one-line explanation.
```

## Design rationale

- **"Diverse, original, and actionable"** pushes the model away from obvious,
  repetitive answers.
- **Bounded count (8–10)** gives enough breadth to be useful without rambling.
- **Title + one-liner format** makes the list easy to scan and pick from.

## UX

| Field | Value |
|---|---|
| Run label | Brainstorm |
| Output label | Ideas |
| Placeholder | e.g. Names for a privacy-first note-taking app… |

## Limitations

- Idea quality scales with model size; `gemma2:2b` and `phi3.5:3.8b` produce
  more original suggestions than the smallest model.
