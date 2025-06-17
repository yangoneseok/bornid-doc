import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import FeaturesSection from '@site/src/components/FeaturesSection';
import TechnologyOverviewSection from '@site/src/components/TechnologyOverviewSection';
import TechnologyComponentsSection from '@site/src/components/TechnologyComponentsSection';
import UseCasesSection from '@site/src/components/UseCasesSection';
import HeroSection from '@site/src/components/HeroSection';

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="C2PA standard-based content authenticity verification API. Real-time verification of image and video origin and integrity through AI fingerprinting and digital signatures."
    >
      <main>
        <HeroSection />
        <FeaturesSection />
        <TechnologyOverviewSection />
        <TechnologyComponentsSection />
        <UseCasesSection />
      </main>
    </Layout>
  );
}
