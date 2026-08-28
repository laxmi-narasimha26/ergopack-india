import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ScenarioProposals from '@/components/roi/ScenarioProposals';

export const metadata: Metadata = {
  title: 'ErgoPack Payback Scenarios | Ready-Made ROI Proposals by Pallet Volume',
  description:
    'See exactly which ErgoPack machine fits your pallet volume and when it pays for itself — worked scenarios for the 700, GO and 726X Li with real labour, time and material savings.',
};

export default function RoiScenariosPage() {
  return (
    <MainLayout>
      <ScenarioProposals />
    </MainLayout>
  );
}
