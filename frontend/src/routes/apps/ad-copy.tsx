import { createFileRoute } from '@tanstack/react-router';
import { Megaphone } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/ad-copy')({
  component: AdCopy,
});

function AdCopy() {
  return (
    <TextToolApp
      title="Ad Copy Generator"
      description="Turn product or campaign details into headlines, ad descriptions and calls to action."
      icon={Megaphone}
      system="You are a senior marketing copywriter. From the product or campaign details, generate in markdown: 5 punchy headlines, 3 short ad descriptions (each under 30 words), and 3 call-to-action phrases. Match the tone to the target audience and keep every claim realistic and non-misleading."
      inputLabel="Product / campaign details"
      placeholder="Describe the product, target audience and the key benefit…"
      runLabel="Generate ad copy"
      outputLabel="Ad copy"
      accent="#ec4899"
    />
  );
}
