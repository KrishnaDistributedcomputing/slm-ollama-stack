# JSON Builder — Design Document

**Route:** `/apps/json-builder` · **Source:** [json-builder.tsx](../../frontend/src/routes/apps/json-builder.tsx) · **Icon:** `FileJson`

## Purpose

Describe the data you need in plain language and get a well-formed JSON document
with realistic example values, fully offline.

## How AI is used

A **schema-synthesis** app. From a natural-language description, the model infers
field names, nesting, and data types, then produces a single valid JSON document
populated with realistic sample values. Unlike Data Extractor, the output is
wrapped in a fenced `json` block for clean display.

- **Technique:** description → JSON schema + sample data.
- **Input:** a description of the desired data shape.
- **Output:** one JSON document inside a ```` ```json ```` fence.

## System prompt

```text
You are a JSON generator. Convert the user's description into a single, valid JSON
document that best represents the requested data. Infer sensible field names,
nesting, and data types, and include realistic example values. Output ONLY the
JSON inside a ```json code block, with no commentary before or after.
```

## Design rationale

- **Synthesis, not extraction:** the model *designs* a structure from a
  description rather than pulling data from existing text — the inverse of
  [Data Extractor](data-extractor.md).
- **Realistic example values** make the output immediately useful as a fixture or
  API mock.
- **Fenced output** suits display and copy-paste; the explicit "no commentary"
  keeps it clean.

## UX

| Field | Value |
|---|---|
| Run label | Generate JSON |
| Output label | JSON |
| Placeholder | e.g. A user profile with name, email, age, a list of roles, and an address… |

## Contrast with Data Extractor

| | JSON Builder | Data Extractor |
|---|---|---|
| Direction | Description → JSON | Text → JSON |
| Output | Fenced ` ```json ` block | Raw JSON (no fences) |
| Values | Invented examples | Extracted from input |
