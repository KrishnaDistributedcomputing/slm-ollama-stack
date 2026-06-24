import { createFileRoute } from '@tanstack/react-router';
import { Braces } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/extractor')({
  component: Extractor,
});

function Extractor() {
  return (
    <TextToolApp
      title="Data Extractor"
      description="Turn unstructured text — emails, invoices, notes — into structured JSON with a local model."
      icon={Braces}
      system="You extract structured data from unstructured text. Return ONLY valid JSON with sensible keys for the entities, attributes, dates, amounts, and names you find. Use nested objects and arrays where appropriate. Do not include explanations or markdown code fences."
      inputLabel="Unstructured text"
      placeholder="Paste an email, invoice, receipt, or note…"
      runLabel="Extract JSON"
      outputLabel="Structured JSON"
      accent="#f43f5e"
      examples={[
        {
          label: 'Invoice email',
          text: `Hi, please find invoice #INV-2045 attached. Total due: $4,820.00, payable by 2026-07-15. Bill to: Northwind Traders, 200 Market St, Seattle, WA. Line items: 10x Pro licenses @ $400, 1x onboarding @ $820. Payment terms: Net 30. Questions? Reply to billing@contoso.com.`,
        },
        {
          label: 'Shipping confirmation',
          text: `Your order CW-7781 has shipped! 2x "Aurora Desk Lamp" and 1x "USB-C Hub" are on the way to Jamie Lee, 14 Elm Road, Austin, TX 78701. Carrier: FedEx, tracking 7712 8830 4456, estimated delivery June 27.`,
        },
      ]}
    />
  );
}
