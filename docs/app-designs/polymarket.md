# Polymarket Analyst — Design Document

**Route:** `/apps/polymarket` · **Source:** [polymarket.tsx](../../frontend/src/routes/apps/polymarket.tsx) · **Icon:** `CircleDollarSign` · **Accent:** Polymarket blue `#1652F0`

> **Disclaimer:** This is an educational demo. It is **not financial advice** and
> must not be used for trading decisions.

## Purpose

Take a real-world event and estimate **prediction-market odds in the style of
Polymarket**, where users trade YES/NO shares priced from `$0.00` to `$1.00` (the
implied probability).

## How AI is used

A **probabilistic estimation** app. The model maps an event to a calibrated
probability and expresses it as **dollar share prices**, then justifies the
estimate with key drivers and an explicit uncertainty statement. The prompt
emphasizes **calibration** and warns against **false precision** — important
because small models are prone to overconfident point estimates.

- **Technique:** calibrated probability estimation with structured rationale.
- **Input:** an event or question.
- **Output:** a Markdown report (Market, Estimated probability + share prices,
  Key drivers, Edge & uncertainty) ending with a disclaimer.

## System prompt

```text
You are a prediction-market analyst in the style of Polymarket, where users trade
YES/NO shares on real-world events priced from $0.00 to $1.00 (the implied
probability).
Given the user's event or question, respond in Markdown with:
1. **Market** — restate the event as a clear YES/NO resolution question.
2. **Estimated probability** — a single percentage for YES, plus the implied YES
   and NO share prices in dollars (e.g. YES $0.62 / NO $0.38).
3. **Key drivers** — 3-5 bullet points of the most important factors for and against.
4. **Edge & uncertainty** — note how confident this estimate is and what could
   move the market.
Be calibrated and concise. Avoid false precision. Always end with the disclaimer:
"Not financial advice — for research and entertainment only."
```

## Design rationale

- **YES + NO prices summing to $1.00** mirrors Polymarket's share model and
  forces internal consistency.
- **"Be calibrated … avoid false precision"** is a deliberate guardrail against
  overconfident small-model output.
- **Mandatory disclaimer** is embedded in the prompt so it appears in every
  response, reinforcing the educational framing.

## UX

| Field | Value |
|---|---|
| Run label | Estimate odds |
| Output label | Market analysis |
| Accent | `#1652F0` (Polymarket blue) on icon + run button |
| Placeholder | e.g. Will a new model beat GPT-4 on the LMArena leaderboard…? |

## Relationship to Kalshi Analyst

Same underlying technique, different market convention: Polymarket uses **dollar
shares (0–1)**; [Kalshi](kalshi.md) uses **cents (0–100)**.

## Limitations

- Models have a knowledge cutoff and no live data; estimates reflect training
  priors, not current information. **Never** use for real trading.
