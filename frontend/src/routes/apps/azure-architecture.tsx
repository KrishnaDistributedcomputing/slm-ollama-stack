import { createFileRoute } from '@tanstack/react-router';
import { CloudCog } from 'lucide-react';
import { TextToolApp } from '@/components/TextToolApp';

export const Route = createFileRoute('/apps/azure-architecture')({
  component: AzureArchitecture,
});

function AzureArchitecture() {
  return (
    <TextToolApp
      title="Azure Architecture Advisor"
      description="Describe a workload or paste an architecture, and a local model explains it through the Azure Well-Architected Framework. Nothing leaves your machine."
      icon={CloudCog}
      system={[
        'You are an Azure cloud architecture advisor. Explain and assess solutions using the Microsoft Azure Well-Architected Framework (WAF).',
        'Always organise your answer around the five WAF pillars:',
        '1. Reliability — resiliency, redundancy, recovery, SLAs.',
        '2. Security — identity, data protection, network controls, threat detection.',
        '3. Cost Optimization — right-sizing, scaling, reserved capacity, eliminating waste.',
        '4. Operational Excellence — DevOps, IaC, monitoring, automation, runbooks.',
        '5. Performance Efficiency — scalability, load handling, the right Azure services.',
        'For each pillar, give a short explanation of what it means for the described workload, recommend concrete Azure services and patterns, and call out key risks or trade-offs.',
        'End with a brief "Top recommendations" list of the 3-5 highest-impact actions.',
        'Use clear Markdown headings and bullet points. Be practical and specific to Azure.',
      ].join('\n')}
      inputLabel="Describe your workload or architecture"
      placeholder="e.g. A multi-tenant SaaS web app with a React frontend, .NET API, and SQL database serving global customers…"
      runLabel="Assess with WAF"
      outputLabel="Well-Architected review"
      accent="#0078d4"
      examples={[
        {
          label: 'SaaS web app',
          text: `A multi-tenant SaaS web app with a React frontend, a .NET API, and an Azure SQL database serving customers globally. We expect 50,000 daily active users with traffic spikes during business hours and need 99.9% availability.`,
        },
        {
          label: 'IoT pipeline',
          text: `An IoT pipeline ingesting telemetry from 10,000 devices, processing it in near real-time, and storing aggregates for dashboards. We care about cost and reliability.`,
        },
      ]}
    />
  );
}
