import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { FileText, FileLock, FileCode } from 'lucide-react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

interface TechComponent {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  details: {
    ko: string[];
    en: string[];
  };
}

const components: TechComponent[] = [
  {
    icon: FileText,
    title: {
      ko: '매니페스트',
      en: 'Manifest',
    },
    description: {
      ko: 'C2PA의 핵심 데이터 구조로, 자산(에셋)의 프로비넌스 정보를 담고 있으며 다음 요소로 구성됩니다.',
      en: 'The core data structure of C2PA that contains provenance information of assets and consists of the following elements.',
    },
    details: {
      ko: ['Assertions', 'Claim', 'Claim Signature'],
      en: ['Assertions', 'Claim', 'Claim Signature'],
    },
  },
  {
    icon: FileLock,
    title: {
      ko: '바인딩',
      en: 'Binding',
    },
    description: {
      ko: '콘텐츠와 매니페스트를 연결하는 메커니즘으로, 두가지 유형이 있습니다.',
      en: 'A mechanism that connects content and manifests, with two types available.',
    },
    details: {
      ko: ['Hard Binding', 'Soft Binding'],
      en: ['Hard Binding', 'Soft Binding'],
    },
  },
  {
    icon: FileCode,
    title: {
      ko: '신뢰 모델',
      en: 'Trust Model',
    },
    description: {
      ko: 'C2PA는 X.509 인증서를 사용한 디지털 서명을 통해 콘텐츠의 진위성을 검증합니다.',
      en: 'C2PA verifies content authenticity through digital signatures using X.509 certificates.',
    },
    details: {
      ko: ['C2PA 신뢰 목록', 'C2PA TSA 신뢰 목록', '검증 상태'],
      en: ['C2PA Trust List', 'C2PA TSA Trust List', 'Validation Status'],
    },
  },
];

interface ComponentCardProps {
  component: TechComponent;
  index: number;
  isVisible: boolean;
  isEnglish: boolean;
}

function ComponentCard({
  component,
  index,
  isVisible,
  isEnglish,
}: ComponentCardProps) {
  const IconComponent = component.icon;

  return (
    <div
      className={`${styles.componentCard} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.iconContainer}>
          <IconComponent className={styles.icon} size={24} />
        </div>
        <Heading as="h3" className={styles.cardTitle}>
          {isEnglish ? component.title.en : component.title.ko}
        </Heading>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardDescription}>
          {isEnglish ? component.description.en : component.description.ko}
        </p>
        <ul className={styles.detailsList}>
          {(isEnglish ? component.details.en : component.details.ko).map(
            (detail, detailIndex) => (
              <li key={detailIndex} className={styles.detailItem}>
                <span className={styles.bullet}></span>
                {detail}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default function TechnologyComponentsSection(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(components.length).fill(false)
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
            }, index * 150);
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
    <section className={styles.technologyComponentsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as="h2" className={styles.title}>
            {isEnglish ? 'Technology Components' : '기술 구성 요소'}
          </Heading>
        </div>

        <div className={styles.grid}>
          {components.map((component, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
            >
              <ComponentCard
                component={component}
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
