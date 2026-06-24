import { createFileRoute } from '@tanstack/react-router';
import { ClipboardList } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/meeting-notes')({
  component: MeetingNotes,
});

function MeetingNotes() {
  return (
    <TextToolApp
      title="Meeting Assistant"
      description="Turn raw meeting notes or a transcript into a summary, decisions and owner-assigned action items."
      icon={ClipboardList}
      system="You are a meeting assistant. From the user's raw meeting notes or transcript, produce three markdown sections: a 2-3 sentence Summary, a 'Decisions' list, and an 'Action items' list where each item names an owner (if mentioned) and a due date (if mentioned). Do not invent attendees, decisions or facts that are not present in the text."
      inputLabel="Meeting notes or transcript"
      placeholder="Paste raw meeting notes, bullet points, or a transcript…"
      runLabel="Extract actions"
      outputLabel="Summary & action items"
      accent="#4f46e5"
      examples={[
        {
          label: 'Project sync',
          text: `[Project sync — 6/24]
Priya: The API migration is done in staging, we just need sign-off from security.
Tom: I can review it Thursday. If it passes I'll deploy Friday morning.
Priya: Marketing wants the feature live before the webinar on the 30th.
Dana: I'll draft the release notes and send them to Tom by Wednesday.
Tom: We also need a rollback plan — let's keep v1 running for a week.
Priya: Agreed. Dana, can you own the customer comms?
Dana: Yes, I'll send the heads-up email Monday.`,
        },
      ]}
    />
  );
}
