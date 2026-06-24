import { createFileRoute } from '@tanstack/react-router';
import { FileText } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/summarizer')({
  component: Summarizer,
});

function Summarizer() {
  return (
    <TextToolApp
      title="Summarizer"
      description="Condense long text into clear bullet points using a local model. Nothing leaves your machine."
      icon={FileText}
      system="You are a precise summarization assistant. Summarize the user's text into 3-6 concise bullet points that capture the key information. Do not add facts that are not present in the text. Output only the bullet points."
      inputLabel="Text to summarize"
      placeholder="Paste an article, document, meeting notes…"
      runLabel="Summarize"
      outputLabel="Summary"
      accent="#0ea5e9"
      examples={[
        {
          label: 'Product launch',
          text: `We're excited to announce the general availability of Atlas 2.0, our analytics platform. This release adds real-time dashboards, a redesigned query editor, and single sign-on via Okta and Microsoft Entra ID. Early-access customers reported a 40% reduction in time-to-insight during the beta. Atlas 2.0 is available today on all paid plans at no extra cost; self-hosted customers can upgrade with the 2.0 Helm chart. Support for legacy v1 dashboards ends on March 31, 2026, and we'll publish a migration guide next week.`,
        },
        {
          label: 'Standup notes',
          text: `Standup 6/24: Backend finished the payments refactor. Maria is blocked on the staging database migration and needs DevOps help. Frontend shipped the new onboarding flow behind a feature flag; QA found two minor issues. We agreed to move the marketing launch from Friday to next Tuesday to give QA more time. Sam will schedule a go/no-go review for Monday.`,
        },
      ]}
    />
  );
}
