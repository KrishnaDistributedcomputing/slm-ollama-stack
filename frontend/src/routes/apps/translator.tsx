import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Languages } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

const LANGUAGES = [
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Hindi',
  'Japanese',
  'Chinese',
  'Arabic',
  'English',
];

export const Route = createFileRoute('/apps/translator')({
  component: Translator,
});

function Translator() {
  const [lang, setLang] = useState('Spanish');

  return (
    <TextToolApp
      title="Translator"
      description="Translate text into another language with a local model — fully offline and private."
      icon={Languages}
      system={`You are a professional translator. Translate the user's text into ${lang}. Preserve meaning, tone, and formatting. Output only the translation, with no commentary or quotes.`}
      inputLabel="Text to translate"
      placeholder="Type or paste the text to translate…"
      runLabel="Translate"
      outputLabel={`Translation (${lang})`}
      accent="#10b981"
      examples={[
        {
          label: 'Welcome email',
          text: `Thank you for signing up for Lumen. Your account is ready — click the button below to verify your email and set up your first project. If you have any questions, just reply to this message and our team will be happy to help.`,
        },
        {
          label: 'Product blurb',
          text: `Our wireless earbuds deliver 30 hours of battery life, active noise cancellation, and a secure, comfortable fit for workouts and commutes.`,
        },
      ]}
      controls={
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-2 text-sm"
          aria-label="Target language"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      }
    />
  );
}
