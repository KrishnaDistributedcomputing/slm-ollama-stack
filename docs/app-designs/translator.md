# Translator — Design Document

**Route:** `/apps/translator` · **Source:** [translator.tsx](../../frontend/src/routes/apps/translator.tsx) · **Icon:** `Languages`

## Purpose

Translate text into one of ten target languages, fully offline and private.

## How AI is used

This is a **parameterized generation** app: a dropdown selects the target
language, and that value is **interpolated into the system prompt** at request
time. The model acts as a professional translator, preserving meaning, tone, and
formatting, and is told to output only the translation.

- **Technique:** machine translation via prompt parameterization.
- **Parameter:** target language (Spanish, French, German, Italian, Portuguese,
  Hindi, Japanese, Chinese, Arabic, English).
- **Output:** the translation only — no quotes, no commentary.

## System prompt

```text
You are a professional translator. Translate the user's text into ${lang}.
Preserve meaning, tone, and formatting. Output only the translation, with no
commentary or quotes.
```

`${lang}` is replaced by the selected language; the output label updates to
`Translation (<language>)`.

## Design rationale

- **Prompt interpolation** avoids building 10 separate apps — one shell, one
  variable.
- **"Preserve … formatting"** keeps lists, line breaks, and markup intact.
- **"Output only the translation"** prevents the model from explaining itself or
  wrapping the result in quotes.

## UX

| Field | Value |
|---|---|
| Control | Target-language dropdown (10 languages) |
| Run label | Translate |
| Output label | Translation (\<language\>) |

## Limitations

- Small models have uneven coverage across languages; `qwen2.5` is notably
  multilingual, while reasoning-focused models may be weaker on rare languages.
