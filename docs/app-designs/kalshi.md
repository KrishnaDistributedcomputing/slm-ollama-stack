# Kalshi Analyst — Design Document

**Route:** `/apps/kalshi` · **Source:** [kalshi.tsx](../../frontend/src/routes/apps/kalshi.tsx) · **Icon:** `CandlestickChart` · **Accent:** Kalshi mint `#00D09C`

> **Disclaimer:** This is an educational demo. It is **not financial advice** and
> must not be used for trading decisions.

## Purpose

Turn an event question into a **Kalshi-style event contract**, where YES/NO
contracts settle at `100¢` (true) or `0¢` (false) and the price in cents equals
the implied probability.

## How AI is used

A **probabilistic estimation** app, parallel to [Polymarket](polymarket.md) but
using the **cents (0–100)** convention of a regulated event-contracts exchange.
The model restates the event as a precise, **verifiable** contract (with a
resolution date/source where relevant), prices YES/NO in cents that **sum to
100**, justifies with base rates and signals, and lists catalysts that could move
the price. The prompt stresses calibration and **citing base rates**.

- **Technique:** calibrated probability estimation framed as contract pricing.
- **Input:** an event or question.
- **Output:** a Markdown report (Contract, Pricing, Rationale, What would change
  the price) ending with a disclaimer.

## System prompt

```text
You are an event-contracts analyst in the style of Kalshi, a regulated exchange
where members trade YES/NO contracts that settle at 100¢ (true) or 0¢ (false). A
contract price in cents equals the implied probability.
Given the user's event or question, respond in Markdown with:
1. **Contract** — restate it as a precise, verifiable YES/NO event with an implied
   resolution date/source if relevant.
2. **Pricing** — YES and NO prices in cents that sum to 100 (e.g. YES 58¢ /
   NO 42¢), and the implied probability.
3. **Rationale** — 3-5 bullet points covering base rates, recent signals, and risks.
4. **What would change the price** — key upcoming catalysts.
Be calibrated, cite base rates where possible, and avoid overconfidence. Always
end with the disclaimer: "Not financial advice — for research and entertainment only."
```

## Design rationale

- **"Precise, verifiable … resolution date/source"** reflects how real Kalshi
  contracts must be objectively settleable — it nudges the model toward
  well-defined questions.
- **Cents summing to 100** enforces a coherent probability.
- **"Cite base rates"** anchors estimates to reference classes, improving
  calibration on small models.
- **Mandatory disclaimer** in the prompt keeps the educational framing on every
  response.

## UX

| Field | Value |
|---|---|
| Run label | Price contract |
| Output label | Contract analysis |
| Accent | `#00D09C` (Kalshi mint) on icon + run button |
| Placeholder | e.g. Will the US Federal Reserve cut interest rates at its next meeting? |

## Relationship to Polymarket Analyst

Same estimation technique; Kalshi prices in **cents (0–100)** and emphasizes
verifiable resolution, while [Polymarket](polymarket.md) prices in **dollar
shares (0–1)**.

## Limitations

- No live market or news access; output reflects training-time priors. **Never**
  use for real trading.
