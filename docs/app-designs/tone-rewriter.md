# Tone Rewriter — Design Document

**Route:** `/apps/rewriter` · **Source:** [rewriter.tsx](../../frontend/src/routes/apps/rewriter.tsx) · **Icon:** `Wand2`

## Purpose

Rewrite text in a different tone or style while keeping the meaning and facts,
fully offline.

## How AI is used

A **parameterized rewriting** app. A style dropdown (More formal, More casual,
More concise, More detailed, Friendlier, More confident) is interpolated into the
system prompt. The model restyles the text while preserving meaning and key
facts.

- **Technique:** style transfer with fact preservation.
- **Parameter:** target style (6 options).
- **Output:** rewritten text only.

## System prompt

```text
You are an expert editor. Rewrite the user's text to be ${style}. Preserve the
original meaning and key facts. Output only the rewritten text, with no commentary.
```

`${style}` is the lowercased selected style; the output label reads
`Rewritten (<Style>)`.

## Design rationale

- **Style as a parameter** covers many editing intents from one shell.
- **"Preserve … meaning and key facts"** prevents drift during restyling — the
  rewrite must stay faithful.
- **"Output only the rewritten text"** keeps it a clean replacement.

## UX

| Field | Value |
|---|---|
| Control | Style dropdown (6 options) |
| Run label | Rewrite |
| Output label | Rewritten (\<Style\>) |
| Placeholder | Paste the text you want to rephrase… |

## Relationship to Proofreader

Tone Rewriter changes *style*; [Proofreader](proofreader.md) fixes *errors*.
