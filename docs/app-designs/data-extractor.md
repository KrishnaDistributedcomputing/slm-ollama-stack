# Data Extractor — Design Document

**Route:** `/apps/extractor` · **Source:** [extractor.tsx](../../frontend/src/routes/apps/extractor.tsx) · **Icon:** `Braces`

## Purpose

Turn unstructured text — emails, invoices, receipts, notes — into structured
JSON, fully offline.

## How AI is used

This is a **constrained information-extraction** task. The model reads free text
and emits **only valid JSON**, inferring sensible keys for entities, attributes,
dates, amounts, and names, using nested objects/arrays where appropriate. The
prompt explicitly bans explanations and markdown fences so the output can be
parsed downstream.

- **Technique:** schema-free structured extraction (text → JSON).
- **Input:** any unstructured document.
- **Output:** a single JSON object, no prose, no code fences.

## System prompt

```text
You extract structured data from unstructured text. Return ONLY valid JSON with
sensible keys for the entities, attributes, dates, amounts, and names you find.
Use nested objects and arrays where appropriate. Do not include explanations or
markdown code fences.
```

## Design rationale

- **"Return ONLY valid JSON"** is the core guardrail — it makes the output
  machine-consumable.
- **No code fences** distinguishes this app from JSON Builder (which *wants*
  fenced output for display); here the goal is parse-ready data.
- **Schema-free** by design: the model infers structure from the content, which
  suits heterogeneous inputs like invoices vs. emails.

## UX

| Field | Value |
|---|---|
| Run label | Extract JSON |
| Output label | Structured JSON |
| Placeholder | Paste an email, invoice, receipt, or note… |

## Limitations

- Small models occasionally emit slightly invalid JSON (trailing commas, missing
  quotes). Validate before consuming. Larger models are more reliable.
