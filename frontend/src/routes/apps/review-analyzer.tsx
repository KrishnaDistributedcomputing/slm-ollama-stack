import { createFileRoute } from '@tanstack/react-router';
import { Star } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/review-analyzer')({
  component: ReviewAnalyzer,
});

function ReviewAnalyzer() {
  return (
    <TextToolApp
      title="Customer Review Analyzer"
      description="Turn customer reviews into sentiment, recurring themes and concrete actions."
      icon={Star}
      system="You are a customer insights analyst. From the customer reviews or feedback provided, respond in markdown with: overall Sentiment (Positive / Mixed / Negative) with a rough percentage split, 'Top positive themes' and 'Top negative themes' lists, a 'Specific issues to fix' list, and one suggested action. Base everything strictly on the provided reviews."
      inputLabel="Customer reviews or feedback"
      placeholder="Paste one or more customer reviews…"
      runLabel="Analyze reviews"
      outputLabel="Insights"
      accent="#ca8a04"
    />
  );
}
