# Email Writer — Design Document

**Route:** `/apps/email-writer` · **Source:** [email-writer.tsx](../../frontend/src/routes/apps/email-writer.tsx) · **Icon:** `Mail`

## Purpose

Turn a few rough notes into a polished, well-structured email, fully offline.

## How AI is used

A **parameterized text-generation** app. A tone dropdown (Professional, Friendly,
Concise, Formal, Apologetic, Persuasive) is interpolated into the system prompt,
and the model expands the user's brief into a complete email with subject line,
greeting, body, and sign-off.

- **Technique:** brief-to-document expansion with tone control.
- **Parameter:** tone (6 options).
- **Output:** a complete email only.

## System prompt

```text
You are an expert email writer. Compose a well-structured ${tone} email based on
the user's notes. Include a clear subject line, greeting, body, and sign-off.
Output only the email.
```

`${tone}` is the lowercased selected tone; the output label reads `Email (<Tone>)`.

## Design rationale

- **Structural checklist** (subject/greeting/body/sign-off) guarantees a usable
  email shape even from a one-line brief.
- **Tone as a parameter** lets one app cover many situations without separate
  prompts.
- **"Output only the email"** strips meta-commentary.

## UX

| Field | Value |
|---|---|
| Control | Tone dropdown (6 options) |
| Run label | Write email |
| Output label | Email (\<Tone\>) |
| Placeholder | e.g. Ask the team to move tomorrow's standup to 11am… |

## Limitations

- The model may invent specifics (names, dates) not in the brief; review before
  sending.
