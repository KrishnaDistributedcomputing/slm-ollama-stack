import { createFileRoute } from '@tanstack/react-router';
import { Lightbulb } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/brainstorm')({
  component: Brainstorm,
});

function Brainstorm() {
  return (
    <TextToolApp
      title="Brainstormer"
      description="Generate fresh ideas around any topic with a local model. Nothing leaves your machine."
      icon={Lightbulb}
      system="You are a creative brainstorming partner. Given the user's topic or problem, generate 8-10 diverse, original, and actionable ideas. Format each as a short bullet with a bold title and a one-line explanation."
      inputLabel="Topic or problem"
      placeholder="e.g. Names for a privacy-first note-taking app…"
      runLabel="Brainstorm"
      outputLabel="Ideas"
      accent="#eab308"
      examples={[
        {
          label: 'Marketing campaign',
          text: `Marketing campaign ideas for a startup that sells refillable, plastic-free home-cleaning products to environmentally conscious millennials.`,
        },
        {
          label: 'Team offsite',
          text: `Activities for a remote engineering team's two-day in-person offsite focused on team bonding and planning the next quarter.`,
        },
      ]}
    />
  );
}
