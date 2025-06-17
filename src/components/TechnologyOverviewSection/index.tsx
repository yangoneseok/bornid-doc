import React, { useEffect, useRef, useState, ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function TechnologyOverviewSection(): ReactNode {
  const { i18n } = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.technologySection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Heading as="h2" className={styles.title}>
            {isEnglish ? 'Technology Overview' : '기술 개요'}
          </Heading>
        </div>

        <div className={styles.content}>
          {/* C2PA 설명 */}
          <div
            className={`${styles.contentBlock} ${styles.leftSlide} ${
              isVisible ? styles.visible : styles.hidden
            }`}
          >
            <div className={styles.textContent}>
              <Heading as="h3" className={styles.subtitle}>
                {isEnglish
                  ? 'What is C2PA (Coalition for Content Provenance and Authenticity)?'
                  : 'C2PA(Coalition for Content Provenance and Authenticity)란?'}
              </Heading>
              <p className={styles.description}>
                {isEnglish
                  ? 'C2PA is an open technical standard that enables verification of the source and authenticity of digital content. Also known as "Content Credentials," this technology enables secure recording and tracking of the history (provenance) of digital media from creation through editing to distribution.'
                  : "디지털 콘텐츠의 출처와 진위성을 검증할 수 있는 개방형 기술 표준입니다. '콘텐츠 크레덴셜'(Content Credentials)이라고도 불리는 이 기술은 디지털 미디어의 생성부터 편집, 배포까지 전 과정에 걸친 이력(프로비넌스)을 안전하게 기록하고 추적할 수 있게 합니다."}
              </p>
            </div>
            <div className={styles.imageContainer}>
              <div
                className={`${styles.placeholder} ${styles.c2paPlaceholder}`}
              >
                <p className={styles.placeholderText}>
                  {isEnglish
                    ? 'C2PA Technology Concept Diagram'
                    : 'C2PA 기술 개념도'}
                </p>
              </div>
            </div>
          </div>

          {/* 콘텐츠 크레덴셜 필요성 */}
          <div
            className={`${styles.contentBlock} ${styles.rightSlide} ${
              styles.reverse
            } ${isVisible ? styles.visible : styles.hidden}`}
          >
            <div className={styles.imageContainer}>
              <div
                className={`${styles.placeholder} ${styles.credentialsPlaceholder}`}
              >
                <p className={styles.placeholderText}>
                  {isEnglish
                    ? 'Content Verification Process'
                    : '콘텐츠 검증 과정'}
                </p>
              </div>
            </div>
            <div className={styles.textContent}>
              <Heading as="h3" className={styles.subtitle}>
                {isEnglish
                  ? 'The Need for Content Credentials'
                  : '콘텐츠 크레덴셜(Content Credentials)의 필요성'}
              </Heading>
              <p className={styles.description}>
                {isEnglish
                  ? 'In an environment where digital content manipulation is becoming easier and misinformation spreads rapidly, there is a growing need to record and verify the origin and change history of content in a reliable way. The C2PA open technical standard was developed to solve the following problems:'
                  : '디지털 콘텐츠의 조작이 쉬워지고 허위정보가 빠르게 확산되는 환경에서, 콘텐츠의 출처와 변경 이력을 신뢰할 수 있는 방법으로 기록하고 검증할 필요성이 증가하고 있습니다. C2PA 개방형 기술 표준은 다음과 같은 문제를 해결하기 위해 개발되었습니다.'}
              </p>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}></span>
                  {isEnglish
                    ? 'Transparently provide the origin and change history of digital content'
                    : '디지털 콘텐츠의 출처와 변경 이력을 투명하게 제공'}
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}></span>
                  {isEnglish
                    ? 'Support identification of intentional misinformation or manipulated content'
                    : '의도적 허위정보나 조작된 콘텐츠 식별 지원'}
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}></span>
                  {isEnglish
                    ? "Protect content creators' rights"
                    : '콘텐츠 제작자의 권리 보호'}
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}></span>
                  {isEnglish
                    ? 'Restore trust in media'
                    : '미디어에 대한 신뢰 회복'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
