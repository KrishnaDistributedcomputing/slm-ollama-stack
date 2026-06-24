# Code Reviewer — Design Document

**Route:** `/apps/code-reviewer` · **Source:** [code-reviewer.tsx](../../frontend/src/routes/apps/code-reviewer.tsx) · **Icon:** `Code2`

## Purpose

Provide a fast, local code review — bugs, security issues, edge cases, and
concrete improvements — without sending code to a cloud service.

## How AI is used

The app uses **persona priming** ("a senior software engineer performing a code
review") combined with a **checklist of concerns** (bugs, security, edge cases,
improvements). This focuses the model on actionable findings rather than generic
praise, and asks for concise bullets with short code snippets for reference.

- **Technique:** role-conditioned structured critique.
- **Input:** a function, class, or file pasted as text.
- **Output:** bullet-point review; a brief "looks fine" if no issues.

## System prompt

```text
You are a senior software engineer performing a code review. Identify bugs,
security issues, edge cases, and suggest concrete improvements. Be concise and
use bullet points. Reference the code with short snippets when helpful. If the
code looks fine, say so briefly.
```

## Design rationale

- **Explicit concern list** steers the model toward the high-value categories a
  real reviewer checks, including **security** (an OWASP-style mindset).
- **"If the code looks fine, say so briefly"** prevents the model from inventing
  problems just to fill space — a common small-model tendency.
- **Snippets when helpful** ground feedback in the actual code.

## UX

| Field | Value |
|---|---|
| Run label | Review |
| Output label | Review notes |
| Placeholder | Paste a function, class, or file… |

## Limitations

- Small models can miss subtle bugs or hallucinate APIs. Prefer `phi3.5:3.8b`
  (strong at code) for non-trivial reviews; always verify suggestions.
