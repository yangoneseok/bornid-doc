import React, { ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { useRevealOnScroll } from '@site/src/hooks/useRevealOnScroll';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Interfaces and components from FeaturesSection
interface FeatureCardProps {
  headerText: string;
  titleKey: string;
  titleText: string;
  descriptionKey: string;
  descriptionText: string;
  listItems: { key: string; text: string }[];
  imageSrc: string;
  index: number;
  customClassName?: string;
  headerColorClass: string;
}

function FeatureCard({
  headerText,
  titleKey,
  titleText,
  descriptionKey,
  descriptionText,
  listItems,
  imageSrc,
  index,
  customClassName,
  headerColorClass,
}: FeatureCardProps) {
  return (
    <div
      className={clsx(styles.featureCard, customClassName)}
      data-index={index}
    >
      <div className={styles.cardTop}>
        <p className={clsx(styles.headerText, headerColorClass)}>
          {headerText}
        </p>
        <div className={styles.cardImageContainer}>
          <img src={imageSrc} alt={titleText} className={styles.cardImage} />
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardBody}>
          <Heading as="h3" className={styles.cardTitle}>
            <Translate id={titleKey}>{titleText}</Translate>
          </Heading>
          <p className={styles.cardDescription}>
            <Translate id={descriptionKey}>{descriptionText}</Translate>
          </p>
          <ul className={styles.cardList}>
            {listItems.map((item) => (
              <li key={item.key}>
                <Translate id={item.key}>{item.text}</Translate>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FeatureCardsGrid({
  features,
}: {
  features: Omit<FeatureCardProps, 'index'>[];
}) {
  const containerRef = useRevealOnScroll<HTMLDivElement>({
    itemSelector: `.${styles.featureCard}`,
    visibleClass: styles.visible,
  });

  return (
    <div className={styles.grid} ref={containerRef}>
      {features.map((feature, index) => {
        const { ...featureProps } = feature;
        return <FeatureCard key={index} {...featureProps} index={index} />;
      })}
    </div>
  );
}

export default function TechnologyComponentsSection(): ReactNode {
  const features: Omit<FeatureCardProps, 'index'>[] = [
    {
      headerText: 'Technology 1',
      titleKey: 'homepage.techcomponents.manifest.title',
      titleText: '매니페스트(Manifest)',
      descriptionKey: 'homepage.techcomponents.manifest.description',
      descriptionText:
        'C2PA의 핵심 데이터 구조로, 자산(에셋)의 프로비넌스 정보를 담고 있으며 다음 요소로 구성됩니다.',
      listItems: [
        {
          key: 'homepage.techcomponents.manifest.item1',
          text: '어서션(Assertions)',
        },
        {
          key: 'homepage.techcomponents.manifest.item2',
          text: '클레임(Claim)',
        },
        {
          key: 'homepage.techcomponents.manifest.item3',
          text: '클레임 서명(Claim Signature)',
        },
      ],
      imageSrc: '/img/icons/tech1.png',
      headerColorClass: styles.headerBlue,
    },
    {
      headerText: 'Technology 2',
      titleKey: 'homepage.techcomponents.binding.title',
      titleText: '바인딩(Binding)',
      descriptionKey: 'homepage.techcomponents.binding.description',
      descriptionText:
        '콘텐츠와 매니페스트를 연결하는 메커니즘으로, 두가지 유형이 있습니다.',
      listItems: [
        {
          key: 'homepage.techcomponents.binding.item1',
          text: '하드 바인딩(Hard Binding)',
        },
        {
          key: 'homepage.techcomponents.binding.item2',
          text: '소프트 바인딩(Soft Binding)',
        },
      ],
      imageSrc: '/img/icons/tech2.png',
      headerColorClass: styles.headerTurquoise,
    },
    {
      headerText: 'Technology 3',
      titleKey: 'homepage.techcomponents.trust.title',
      titleText: '신뢰 모델(Trust Model)',
      descriptionKey: 'homepage.techcomponents.trust.description',
      descriptionText:
        'C2PA는 X.509 인증서를 사용한 디지털 서명을 통해 콘텐츠의 진위성을 검증합니다.',
      listItems: [
        {
          key: 'homepage.techcomponents.trust.item1',
          text: 'C2PA 신뢰 목록',
        },
        {
          key: 'homepage.techcomponents.trust.item2',
          text: 'C2PA TSA 신뢰 목록',
        },
        {
          key: 'homepage.techcomponents.trust.item3',
          text: '검증 상태',
        },
      ],
      imageSrc: '/img/icons/tech3.png',
      headerColorClass: styles.headerBlue,
    },
  ];

  return (
    // Changed section id and class names for TechnologyComponentsSection
    <section
      id="technology-components"
      className={styles.technologyComponentsSection}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as="h2" className={styles.title}>
            <Translate id="homepage.techcomponents.title">
              기술 구성 요소
            </Translate>
          </Heading>
        </div>

        <BrowserOnly>
          {() => <FeatureCardsGrid features={features} />}
        </BrowserOnly>
      </div>
    </section>
  );
}
