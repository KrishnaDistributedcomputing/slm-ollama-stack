import { createFileRoute } from '@tanstack/react-router';
import { LifeBuoy } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/support-reply')({
  component: SupportReply,
});

function SupportReply() {
  return (
    <TextToolApp
      title="Support Reply Assistant"
      description="Draft clear, empathetic and professional replies to customer support messages."
      icon={LifeBuoy}
      system="You are an experienced customer support specialist. Draft a clear, empathetic and professional reply to the customer's message. Acknowledge the issue, give concrete next steps or a solution, and keep a warm, helpful tone. If key information is missing, ask one focused clarifying question. Keep it concise and ready to send."
      inputLabel="Customer message"
      placeholder="Paste the customer's email or chat message…"
      runLabel="Draft reply"
      outputLabel="Suggested reply"
      accent="#0891b2"
      examples={[
        {
          label: 'Double charge',
          text: `I was charged twice for my Pro subscription this month — once on the 3rd and again on the 5th. I only have one account. Please refund the duplicate charge. Order #PRO-88231.`,
        },
        {
          label: "Can't log in",
          text: `I can't log into my account. I reset my password twice but the reset link says it's expired. I have an important deadline today and need access urgently.`,
        },
      ]}
    />
  );
}
