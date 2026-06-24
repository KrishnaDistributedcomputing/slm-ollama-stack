import { createFileRoute } from '@tanstack/react-router';
import { TrendingUp } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/finance-summary')({
  component: FinanceSummary,
});

function FinanceSummary() {
  return (
    <TextToolApp
      title="Financial Report Summarizer"
      description="Condense earnings text or figures into an executive summary, key metrics and risks."
      icon={TrendingUp}
      system="You are a financial analyst assistant. From the financial report, earnings text or figures provided, respond in markdown with: a short Executive summary, a 'Key metrics' bullet list (revenue, growth, margins, etc.), a 'Risks & trends' list, and a one-line Takeaway. Only use numbers that appear in the text — never fabricate or estimate figures. This is informational only, not financial advice."
      inputLabel="Financial report or figures"
      placeholder="Paste an earnings summary, P&L, or financial figures…"
      runLabel="Summarize financials"
      outputLabel="Financial summary"
      accent="#059669"
    />
  );
}
