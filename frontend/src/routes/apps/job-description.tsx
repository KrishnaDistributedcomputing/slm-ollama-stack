import { createFileRoute } from '@tanstack/react-router';
import { UserPlus } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/job-description')({
  component: JobDescription,
});

function JobDescription() {
  return (
    <TextToolApp
      title="Job Description Writer"
      description="Generate a complete, inclusive job description from a few role details."
      icon={UserPlus}
      system="You are an expert HR recruiter. From the role details provided, write a complete, inclusive job description with these markdown sections: Role summary, Key responsibilities, Required qualifications, Nice-to-have, and What we offer. Use clear, bias-free, professional language. Only build on the details given; keep any assumptions reasonable and generic."
      inputLabel="Role details"
      placeholder="e.g. Senior Backend Engineer, fintech, Python + AWS, remote, 5+ years…"
      runLabel="Write job description"
      outputLabel="Job description"
      accent="#7c3aed"
    />
  );
}
