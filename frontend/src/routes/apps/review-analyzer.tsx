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
      examples={[
        {
          label: 'App store reviews',
          text: `"Love the app but it crashes every time I upload a large file." 2/5
"Fast support, they fixed my issue within an hour. Highly recommend." 5/5
"Good value but the mobile version is missing half the features." 3/5
"Crashed twice during checkout and I lost my cart." 2/5
"Clean interface and easy to set up. Wish it had dark mode." 4/5`,
        },
      ]}
    />
  );
}
