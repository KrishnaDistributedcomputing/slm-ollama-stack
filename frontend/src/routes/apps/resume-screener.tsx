import { createFileRoute } from '@tanstack/react-router';
import { UserSearch } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/resume-screener')({
  component: ResumeScreener,
});

function ResumeScreener() {
  return (
    <TextToolApp
      title="Resume Screener"
      description="Score a candidate against a job description and surface strengths, gaps and interview questions."
      icon={UserSearch}
      system="You are a recruiting assistant. The user provides a job description and a candidate resume separated by a line containing only ---. Assess the candidate's fit and respond in markdown with: a match score out of 100, a one-word verdict (Strong / Possible / Weak), a 'Strengths' bullet list, a 'Gaps / missing requirements' bullet list, and 3 suggested interview questions. Base everything strictly on the provided text and never invent experience."
      inputLabel="Job description and resume"
      placeholder={
        'Paste the job description…\n---\nPaste the candidate resume…'
      }
      runLabel="Screen candidate"
      outputLabel="Screening report"
      accent="#9333ea"
      examples={[
        {
          label: 'Backend role + resume',
          text: `Job: Senior Backend Engineer — Python, FastAPI, PostgreSQL, AWS. 5+ years, payments experience required, must lead a small team.
---
Resume: Alex Carter — Software Engineer with 6 years of experience. Built REST APIs in Python (Django, FastAPI) for an e-commerce platform processing Stripe payments. Led a team of 3 engineers. Deployed services on AWS (ECS, RDS Postgres). B.S. in Computer Science.`,
        },
      ]}
    />
  );
}
