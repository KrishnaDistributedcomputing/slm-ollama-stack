# Explainer — Design Document

**Route:** `/apps/explain` · **Source:** [explain.tsx](../../frontend/src/routes/apps/explain.tsx) · **Icon:** `GraduationCap`

## Purpose

Explain any concept at a chosen comprehension level, fully offline.

## How AI is used

An **audience-adaptive explanation** app. An audience dropdown (a 5-year-old, a
high-school student, a college student, an expert) is interpolated into the
system prompt, instructing the model to calibrate vocabulary, analogies, and
depth to that level. The model is asked for clear language, a helpful analogy,
and a short example.

- **Technique:** level-conditioned explanation (audience as parameter).
- **Parameter:** audience level (4 options).
- **Output:** the explanation only.

## System prompt

```text
You are a brilliant teacher. Explain the concept the user provides so that
${level} can understand it. Use clear language, helpful analogies, and a short
example. Output only the explanation.
```

`${level}` is the selected audience (e.g. "a 5-year-old").

## Design rationale

- **Audience parameterization** is the core idea — the same concept is reframed
  for very different readers from one app.
- **"Analogies … and a short example"** improves comprehension, especially for
  the lower levels.
- **ELI5 ↔ expert range** demonstrates how a single prompt variable changes
  register dramatically.

## UX

| Field | Value |
|---|---|
| Control | Audience-level dropdown (4 options, shown as "For …") |
| Run label | Explain |
| Output label | Explanation |
| Placeholder | e.g. How does HTTPS keep data secure? |

## Limitations

- At the "expert" level, small models may oversimplify or miss nuance; verify
  technical claims.
