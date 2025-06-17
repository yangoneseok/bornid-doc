import React, { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

interface UseCase {
  title: {
    ko: string;
    en: string;
  };
  items: {
    ko: string[];
    en: string[];
  };
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const useCases: UseCase[] = [
  {
    title: {
      ko: '저널리즘/소셜 미디어',
      en: 'Journalism/Social Media',
    },
    items: {
      ko: ['뉴스 콘텐츠의 출처와 편집 이력 제공', '업로드 콘텐츠의 출처 검증'],
      en: [
        'Provide source and editing history of news content',
        'Verify the source of uploaded content',
      ],
    },
    position: 'top-left',
  },
  {
    title: {
      ko: '창작 산업',
      en: 'Creative Industry',
    },
    items: {
      ko: ['디지털 콘텐츠의 저작권 보호 및 출처 명시'],
      en: ['Copyright protection and source attribution of digital content'],
    },
    position: 'top-right',
  },
  {
    title: {
      ko: 'AI 생성 콘텐츠',
      en: 'AI-Generated Content',
    },
    items: {
      ko: ['AI로 생성된 콘텐츠 표시 및 사용된 모델 정보 제공'],
      en: ['Mark AI-generated content and provide model information used'],
    },
    position: 'bottom-left',
  },
  {
    title: {
      ko: '정부/공공기관',
      en: 'Government/Public Institutions',
    },
    items: {
      ko: ['공식 문서 및 기록의 진위성 보장'],
      en: ['Ensure authenticity of official documents and records'],
    },
    position: 'bottom-right',
  },
];

export default function UseCasesSection(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {isEnglish ? 'Use Cases' : '적용 사례'}
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.grid}>
            {/* 중앙 이미지 */}
            <div className={styles.centerImage}>
              <div className={styles.imageContainer}>
                <img
                  src="https://placehold.co/320x320/0a4685/ffffff?text=BornID%0AUse+Cases&font=roboto"
                  alt={
                    isEnglish
                      ? 'BornID Use Cases Diagram'
                      : 'BornID 적용 사례 다이어그램'
                  }
                  className={styles.diagramImage}
                />
              </div>
            </div>

            {/* 왼쪽 상단 */}
            <div className={styles.topLeft}>
              <div className={styles.useCaseRight}>
                <h3 className={styles.useCaseTitle}>
                  {isEnglish ? useCases[0].title.en : useCases[0].title.ko}
                </h3>
                <ul className={styles.useCaseList}>
                  {(isEnglish
                    ? useCases[0].items.en
                    : useCases[0].items.ko
                  ).map((item, index) => (
                    <li key={index} className={styles.useCaseItemRight}>
                      <span>{item}</span>
                      <span className={styles.bulletRight}></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 오른쪽 상단 */}
            <div className={styles.topRight}>
              <div className={styles.useCaseLeft}>
                <h3 className={styles.useCaseTitle}>
                  {isEnglish ? useCases[1].title.en : useCases[1].title.ko}
                </h3>
                <ul className={styles.useCaseList}>
                  {(isEnglish
                    ? useCases[1].items.en
                    : useCases[1].items.ko
                  ).map((item, index) => (
                    <li key={index} className={styles.useCaseItemLeft}>
                      <span className={styles.bulletLeft}></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 왼쪽 하단 */}
            <div className={styles.bottomLeft}>
              <div className={styles.useCaseRight}>
                <h3 className={styles.useCaseTitle}>
                  {isEnglish ? useCases[2].title.en : useCases[2].title.ko}
                </h3>
                <ul className={styles.useCaseList}>
                  {(isEnglish
                    ? useCases[2].items.en
                    : useCases[2].items.ko
                  ).map((item, index) => (
                    <li key={index} className={styles.useCaseItemRight}>
                      <span>{item}</span>
                      <span className={styles.bulletRight}></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 오른쪽 하단 */}
            <div className={styles.bottomRight}>
              <div className={styles.useCaseLeft}>
                <h3 className={styles.useCaseTitle}>
                  {isEnglish ? useCases[3].title.en : useCases[3].title.ko}
                </h3>
                <ul className={styles.useCaseList}>
                  {(isEnglish
                    ? useCases[3].items.en
                    : useCases[3].items.ko
                  ).map((item, index) => (
                    <li key={index} className={styles.useCaseItemLeft}>
                      <span className={styles.bulletLeft}></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
