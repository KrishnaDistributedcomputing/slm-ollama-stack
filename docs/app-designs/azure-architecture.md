# Azure Architecture Advisor — Design Document

**Route:** `/apps/azure-architecture` · **Source:** [azure-architecture.tsx](../../frontend/src/routes/apps/azure-architecture.tsx) · **Icon:** `CloudCog`

## Purpose

Explain and assess a described workload or pasted architecture through the lens
of the **Microsoft Azure Well-Architected Framework (WAF)**, fully offline.

## How AI is used

A **framework-guided assessment** app. Rather than free-form advice, the model is
forced to structure every answer around the **five WAF pillars** and, for each,
explain its relevance, recommend concrete Azure services/patterns, and call out
risks/trade-offs. It closes with a prioritized "Top recommendations" list. This
is **rubric-driven reasoning**: the prompt supplies the evaluation framework and
the model applies it to the user's scenario.

- **Technique:** structured evaluation against a fixed rubric (5 pillars).
- **Input:** a workload description or architecture.
- **Output:** Markdown sections per pillar + a top-recommendations list.

## System prompt

```text
You are an Azure cloud architecture advisor. Explain and assess solutions using
the Microsoft Azure Well-Architected Framework (WAF).
Always organise your answer around the five WAF pillars:
1. Reliability — resiliency, redundancy, recovery, SLAs.
2. Security — identity, data protection, network controls, threat detection.
3. Cost Optimization — right-sizing, scaling, reserved capacity, eliminating waste.
4. Operational Excellence — DevOps, IaC, monitoring, automation, runbooks.
5. Performance Efficiency — scalability, load handling, the right Azure services.
For each pillar, give a short explanation of what it means for the described
workload, recommend concrete Azure services and patterns, and call out key risks
or trade-offs.
End with a brief "Top recommendations" list of the 3-5 highest-impact actions.
Use clear Markdown headings and bullet points. Be practical and specific to Azure.
```

## Design rationale

- **Fixed rubric** guarantees comprehensive, comparable coverage every time —
  the model can't skip security or cost.
- **"Concrete Azure services and patterns"** forces specificity over generic
  cloud platitudes.
- **Prioritized closer** ("Top recommendations") turns analysis into action.

## UX

| Field | Value |
|---|---|
| Run label | Assess with WAF |
| Output label | Well-Architected review |
| Placeholder | e.g. A multi-tenant SaaS web app with a React frontend, .NET API, and SQL database… |

## Limitations

- Recommendations are educational and may reference services imprecisely on
  small models; treat as a starting checklist, not authoritative guidance.
