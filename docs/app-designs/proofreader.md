# Proofreader — Design Document

**Route:** `/apps/proofreader` · **Source:** [proofreader.tsx](../../frontend/src/routes/apps/proofreader.tsx) · **Icon:** `SpellCheck`

## Purpose

Fix grammar, spelling, and punctuation while preserving the author's meaning and
tone, fully offline.

## How AI is used

A **constrained rewriting** task. The model corrects mechanical errors only and
must preserve meaning and tone, returning just the corrected text. By limiting
the scope to grammar/spelling/punctuation, the app avoids the model
"improving" or restyling the writing.

- **Technique:** minimal-edit correction (text → corrected text).
- **Input:** the text to proofread.
- **Output:** corrected text only.

## System prompt

```text
You are a meticulous proofreader. Correct all grammar, spelling, and punctuation
mistakes in the user's text while preserving the original meaning and tone.
Output only the corrected text, with no commentary.
```

## Design rationale

- **Scope limitation** ("grammar, spelling, and punctuation") keeps edits
  conservative — this is *not* a rewriter.
- **"Preserve … meaning and tone"** protects the author's voice.
- **"No commentary"** ensures the output is a drop-in replacement for the input.

## UX

| Field | Value |
|---|---|
| Run label | Proofread |
| Output label | Corrected text |
| Placeholder | Paste the text you want corrected… |

## Relationship to Tone Rewriter

Proofreader fixes *errors*; [Tone Rewriter](tone-rewriter.md) changes *style*.
Together they cover the two distinct editing needs without overlapping scope.
