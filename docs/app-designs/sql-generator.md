# SQL Generator — Design Document

**Route:** `/apps/sql` · **Source:** [sql.tsx](../../frontend/src/routes/apps/sql.tsx) · **Icon:** `Database`

## Purpose

Turn a plain-English request into a correct, well-formatted SQL query, fully
offline.

## How AI is used

A **natural-language-to-code** app. The model acts as an expert SQL engineer,
translating a request into SQL. When the schema isn't provided, it chooses
sensible table/column names and **surfaces its assumptions as a comment** — an
explicit transparency mechanism so the user can correct it. Output is a SQL code
block plus a one-sentence explanation.

- **Technique:** NL→SQL with assumption disclosure.
- **Input:** a plain-English query description.
- **Output:** a SQL code block + one-line explanation.

## System prompt

```text
You are an expert SQL engineer. Convert the user's plain-English request into a
correct, well-formatted SQL query. If table or column names are not given, choose
sensible ones and note any assumptions in a brief comment. Output the SQL in a
code block followed by a one-sentence explanation.
```

## Design rationale

- **Assumption comments** make the generated SQL self-documenting and easy to
  adapt to a real schema — important because the app has no DB context.
- **Code block + one-line explanation** balances copy-paste usability with a
  human-readable summary.
- **"Well-formatted"** encourages readable, indented SQL.

## UX

| Field | Value |
|---|---|
| Run label | Generate SQL |
| Output label | SQL query |
| Placeholder | e.g. Top 5 customers by total order value in 2024… |

## Security note

Generated SQL is a **starting point**. Review for correctness and, before running
against a real database, ensure it is parameterized and safe — never paste
untrusted values directly into queries.
