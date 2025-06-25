import React, { ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { useRevealOnScroll } from '@site/src/hooks/useRevealOnScroll';
import { ShieldCheck, Fingerprint, TerminalSquare } from 'lucide-react';

interface FeatureItemProps {
  titleKey: string;
  title: string;
  descriptionKey: string;
  description: string;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
  index: number;
}

function FeatureItem({
  titleKey,
  title,
  descriptionKey,
  description,
  Icon,
  index,
}: FeatureItemProps) {
  return (
    <div className={styles.featureItem} data-index={index}>
      <div className={styles.featureIconContainer}>
        <Icon className={styles.featureIcon} size={32} />
      </div>
      <div className={styles.featureContent}>
        <Heading as="h3" className={styles.featureTitle}>
          <Translate id={titleKey}>{title}</Translate>
        </Heading>
        <p className={styles.featureDescription}>
          <Translate id={descriptionKey}>{description}</Translate>
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  const containerRef = useRevealOnScroll<HTMLDivElement>({
    itemSelector: `.${styles.featureItem}`,
    visibleClass: styles.visible,
    animationDelayBase: 150,
  });

  const features = [
    {
      titleKey: 'homepage.solution.c2pa.title',
      title: 'C2PA 표준 기반',
      descriptionKey: 'homepage.solution.c2pa.description',
      description:
        '국제 표준 C2PA를 완전히 준수하여 Adobe, Microsoft 등 주요 업체의 도구와 완벽하게 호환됩니다.',
      Icon: ShieldCheck,
    },
    {
      titleKey: 'homepage.solution.fingerprinting.title',
      title: 'AI 지문인식 기술',
      descriptionKey: 'homepage.solution.fingerprinting.description',
      description:
        'CNN 기반 딥러닝으로 이미지와 영상의 고유한 특징을 추출하는 견고한 기술을 제공합니다.',
      Icon: Fingerprint,
    },
    {
      titleKey: 'homepage.solution.sdk.title',
      title: '개발자 친화적 SDK',
      descriptionKey: 'homepage.solution.sdk.description',
      description:
        '현재 iOS(Swift)용 SDK를 제공하고 있으며, 앞으로 Android도 지원할 예정입니다. BornID의 강력한 기능을 모바일 앱에 쉽게 통합해 보세요.',
      Icon: TerminalSquare,
    },
  ];

  return (
    <section className={styles.solutionSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as="h2" className={styles.title}>
            <Translate id="homepage.solution.title">
              BornID의 핵심 기능
            </Translate>
          </Heading>
          <p className={styles.subtitle}>
            <Translate id="homepage.solution.subtitle">
              디지털 콘텐츠 진위성 검증을 위한 신뢰할 수 있는 솔루션을
              제공합니다.
            </Translate>
          </p>
        </div>

        <div className={styles.featuresGrid} ref={containerRef}>
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              titleKey={feature.titleKey}
              title={feature.title}
              descriptionKey={feature.descriptionKey}
              description={feature.description}
              Icon={feature.Icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
