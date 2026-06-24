# Summarizer — Design Document

**Route:** `/apps/summarizer` · **Source:** [summarizer.tsx](../../frontend/src/routes/apps/summarizer.tsx) · **Icon:** `FileText`

## Purpose

Condense long text (articles, documents, meeting notes) into a short, scannable
list of key points, fully offline.

## How AI is used

The app performs **abstractive summarization** with a strong **anti-hallucination
constraint**. The model is instructed to compress the input into 3–6 bullet
points and explicitly forbidden from introducing facts that are not present in
the source. The output format is locked to bullets only, so the result is
predictable regardless of which small model the user picks.

- **Technique:** summarization with format + faithfulness constraints.
- **Input:** the raw text to summarize (single user message).
- **Output:** 3–6 bullet points, nothing else.

## System prompt

```text
You are a precise summarization assistant. Summarize the user's text into 3-6
concise bullet points that capture the key information. Do not add facts that are
not present in the text. Output only the bullet points.
```

## Design rationale

- **"Do not add facts"** targets the main failure mode of small models on
  summarization — confident embellishment.
- **Bounded count (3–6)** keeps output useful on both short and long inputs.
- **"Output only the bullet points"** suppresses preamble ("Here is a
  summary…") that small models tend to emit.

## UX

| Field | Value |
|---|---|
| Run label | Summarize |
| Output label | Summary |
| Placeholder | Paste an article, document, meeting notes… |

## Limitations

- Very long inputs may exceed a small model's context window; the larger models
  (`gemma2:2b`, `phi3.5:3.8b`) handle long documents better.
