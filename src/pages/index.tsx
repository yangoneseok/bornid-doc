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
      description="C2PA 표준 기반의 콘텐츠 진위성 검증 API. AI 지문인식과 디지털 서명으로 이미지·영상의 출처와 무결성을 실시간 검증합니다."
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
