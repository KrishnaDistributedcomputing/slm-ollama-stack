import { createFileRoute } from '@tanstack/react-router';
import { Scale } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/contract-analyzer')({
  component: ContractAnalyzer,
});

function ContractAnalyzer() {
  return (
    <TextToolApp
      title="Contract Clause Analyzer"
      description="Explain contract clauses in plain English and flag risky or unusual terms."
      icon={Scale}
      system="You are a legal assistant. You are not a lawyer and you do not provide legal advice. For the contract text or clause provided, respond in markdown with: a plain-English explanation, the key obligations of each party, a 'Potential risks / unusual terms' list, and 'Questions to raise before signing'. End with a one-line disclaimer that this is informational only and not legal advice. Use only the provided text."
      inputLabel="Contract text or clause"
      placeholder="Paste a contract clause or section…"
      runLabel="Analyze clause"
      outputLabel="Plain-English analysis"
      accent="#b45309"
    />
  );
}
