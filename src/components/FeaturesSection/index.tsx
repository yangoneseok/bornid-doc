import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { FileX, Copyright, FileLock, ShieldX } from 'lucide-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
};

const features: FeatureItem[] = [
  {
    icon: FileX,
    title: {
      ko: '가짜뉴스 생성',
      en: 'Fake News Generation',
    },
    description: {
      ko: '허위 정보가 뉴스 형식으로 제공되어 개인 및 단체의 평판 훼손 및 사회 혼란 초래',
      en: 'False information presented in news format causes reputation damage to individuals and organizations and social confusion',
    },
  },
  {
    icon: Copyright,
    title: {
      ko: '저작권 분쟁',
      en: 'Copyright Disputes',
    },
    description: {
      ko: 'AI 생성 콘텐츠로 인한 지적재산권 침해 및 소유권 논란 발생',
      en: 'Intellectual property infringement and ownership disputes caused by AI-generated content',
    },
  },
  {
    icon: FileLock,
    title: {
      ko: '디지털 성범죄',
      en: 'Digital Sex Crimes',
    },
    description: {
      ko: '딥페이크 기술 악용으로 인한 프라이버시 침해 및 범죄 위험 증가',
      en: 'Privacy violations and increased criminal risks due to deepfake technology abuse',
    },
  },
  {
    icon: ShieldX,
    title: {
      ko: '콘텐츠 위·변조',
      en: 'Content Manipulation',
    },
    description: {
      ko: '콘텐츠 위·변조로 사사적 신뢰도 저하',
      en: 'Decreased private trust due to content forgery and manipulation',
    },
  },
];

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
  isVisible: boolean;
  isEnglish: boolean;
}

function FeatureCard({
  feature,
  index,
  isVisible,
  isEnglish,
}: FeatureCardProps) {
  const IconComponent = feature.icon;

  return (
    <div
      className={`${styles.featureCard} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          <IconComponent className={styles.icon} size={24} />
        </div>
        <Heading as="h3" className={styles.cardTitle}>
          {isEnglish ? feature.title.en : feature.title.ko}
        </Heading>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardDescription}>
          {isEnglish ? feature.description.en : feature.description.ko}
        </p>
      </div>
    </div>
  );
}

export default function FeaturesSection(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(features.length).fill(false)
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((card, index) => {
      if (!card) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, index * 100);
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(card);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as="h2" className={styles.title}>
            {isEnglish ? 'Why Choose BornID?' : '왜 BornID가 필요한가요?'}
          </Heading>
          <p className={styles.subtitle}>
            {isEnglish
              ? 'Discover why digital content authenticity verification is necessary and the problems BornID solves.'
              : '디지털 콘텐츠의 진위성 검증이 필요한 이유와 BornID가 해결하는 문제들을 확인해보세요.'}
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <FeatureCard
                feature={feature}
                index={index}
                isVisible={visibleCards[index]}
                isEnglish={isEnglish}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
