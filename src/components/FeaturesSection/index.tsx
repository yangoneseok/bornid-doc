import React, { ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { useRevealOnScroll } from '@site/src/hooks/useRevealOnScroll';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';

interface FeatureCardProps {
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
      <div className={clsx(styles.cardHeader, headerColorClass)}>
        <Heading as="h3" className={styles.cardTitle}>
          <Translate id={titleKey}>{titleText}</Translate>
        </Heading>
      </div>
      <div className={styles.cardBody}>
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
      <div className={styles.cardFooter}>
        <div className={clsx(styles.cardImage, headerColorClass)}>
          <img src={imageSrc} alt={titleText} className={styles.innerImage} />
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

export default function FeaturesSection(): ReactNode {
  const features: Omit<FeatureCardProps, 'index'>[] = [
    {
      titleKey: 'homepage.features.fakenews.title',
      titleText: '가짜뉴스 생성',
      descriptionKey: 'homepage.features.fakenews.description',
      descriptionText:
        '허위 정보가 뉴스 형식으로 제공되어 개인 및 단체의 평판 훼손 및 사회 혼란 초래',
      listItems: [
        {
          key: 'homepage.features.fakenews.item1',
          text: '가짜 뉴스 확산으로 인한 사회적 인식 왜곡',
        },
        {
          key: 'homepage.features.fakenews.item2',
          text: '가짜뉴스 유포로 경제적 피해 사례 증가',
        },
        {
          key: 'homepage.features.fakenews.item3',
          text: '정치·경제적 목적의 여론 조작 및 사회 혼란 유발',
        },
      ],
      imageSrc: '/img/icons/risk1.png',
      customClassName: styles.specialHover,
      headerColorClass: styles.headerBlue,
    },
    {
      titleKey: 'homepage.features.copyright.title',
      titleText: '저작권 분쟁',
      descriptionKey: 'homepage.features.copyright.description',
      descriptionText:
        'AI 생성 콘텐츠로 인한 지적 재산권 침해 및 소유권 논란 발생',
      listItems: [
        {
          key: 'homepage.features.copyright.item1',
          text: 'AI가 기존 창작물을 학습하여 무단 재사용',
        },
        {
          key: 'homepage.features.copyright.item2',
          text: '창작자의 원본 콘텐츠와 AI 생성물 간의 저작권 충돌',
        },
        {
          key: 'homepage.features.copyright.item3',
          text: '라이선스 및 배포 권한 문제로 법적 분쟁 증가',
        },
      ],
      imageSrc: '/img/icons/risk2.png',
      customClassName: styles.specialHover,
      headerColorClass: styles.headerTurquoise,
    },
    {
      titleKey: 'homepage.features.deepfake.title',
      titleText: '디지털 성범죄',
      descriptionKey: 'homepage.features.deepfake.description',
      descriptionText:
        '딥페이크 기술 악용으로 인한 프라이버시 침해 및 범죄 위험 증가',
      listItems: [
        {
          key: 'homepage.features.deepfake.item1',
          text: '얼굴 합성 및 음성 위조로 인한 사생활 침해',
        },
        {
          key: 'homepage.features.deepfake.item2',
          text: '악의적 조작을 통한 명예훼손 및 협박 범죄 발생',
        },
        {
          key: 'homepage.features.deepfake.item3',
          text: '피해자가 직접 대응하기 어려운 법적 공백 문제',
        },
      ],
      imageSrc: '/img/icons/risk3.png',
      customClassName: styles.specialHover,
      headerColorClass: styles.headerBlue,
    },
    {
      titleKey: 'homepage.features.tampering.title',
      titleText: '콘텐츠 위·변조',
      descriptionKey: 'homepage.features.tampering.description',
      descriptionText: '콘텐츠 위·변조로 사회적 신뢰도 저하',
      listItems: [
        {
          key: 'homepage.features.tampering.item1',
          text: '조작된 이미지·영상으로 허위 사실을 유포하거나 부정 이득을 취득',
        },
        {
          key: 'homepage.features.tampering.item2',
          text: '진위 판별이 어려운 정보 검증 시스템 필요성 증가',
        },
      ],
      imageSrc: '/img/icons/risk4.png',
      customClassName: styles.specialHover,
      headerColorClass: styles.headerTurquoise,
    },
  ];

  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as="h2" className={styles.title}>
            <Translate id="homepage.features.title">
              왜 BornID가 필요한가요?
            </Translate>
          </Heading>
          <p className={styles.subtitle}>
            <Translate id="homepage.features.subtitle">
              디지털 콘텐츠의 진위성 검증이 필요한 이유와 BornID가 해결하는
              문제들을 확인해보세요.
            </Translate>
          </p>
        </div>

        <BrowserOnly>
          {() => <FeatureCardsGrid features={features} />}
        </BrowserOnly>
      </div>
    </section>
  );
}
