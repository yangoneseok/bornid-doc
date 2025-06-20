import React, { useEffect, useRef, useState, ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function TechnologyOverviewSection(): ReactNode {
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
            <Translate id="homepage.technology.title">기술 개요</Translate>
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
                <Translate id="homepage.technology.c2pa.title">
                  C2PA(Coalition for Content Provenance and Authenticity)란?
                </Translate>
              </Heading>
              <p className={styles.description}>
                <Translate id="homepage.technology.c2pa.description">
                  C2PA는 디지털 콘텐츠의 출처와 진위성을 검증할 수 있게 하는
                  개방형 기술 표준입니다. "콘텐츠 크레덴셜(Content
                  Credentials)"이라고도 불리는 이 기술은 디지털 미디어의
                  생성부터 편집, 배포까지의 이력(provenance)을 안전하게 기록하고
                  추적할 수 있게 해줍니다.
                </Translate>
              </p>
            </div>
            <div className={styles.imageContainer}>
              <img
                src="/img/img1.jpg"
                alt="C2PA 기술 개념을 표현하는 추상적인 데이터 흐름 이미지"
                className={styles.overviewImage}
              />
            </div>
          </div>

          {/* 콘텐츠 크레덴셜 필요성 */}
          <div
            className={`${styles.contentBlock} ${styles.rightSlide} ${
              styles.reverse
            } ${isVisible ? styles.visible : styles.hidden}`}
          >
            <div className={styles.imageContainer}>
              <img
                src="/img/img2.jpg"
                alt="콘텐츠 크레덴셜의 필요성을 나타내는 디지털 네트워크 이미지"
                className={styles.overviewImage}
              />
            </div>
            <div className={styles.textContent}>
              <Heading as="h3" className={styles.subtitle}>
                <Translate id="homepage.technology.credentials.title">
                  콘텐츠 크레덴셜의 필요성
                </Translate>
              </Heading>
              <p className={styles.description}>
                <Translate id="homepage.technology.credentials.description">
                  디지털 콘텐츠 조작이 쉬워지고 잘못된 정보가 빠르게 확산되는
                  환경에서, 콘텐츠의 출처와 변경 이력을 신뢰할 수 있는 방식으로
                  기록하고 검증할 필요성이 증가하고 있습니다. C2PA 개방형 기술
                  표준은 다음과 같은 문제를 해결하기 위해 개발되었습니다:
                </Translate>
              </p>
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}></span>
                  <Translate id="homepage.technology.benefits.transparency">
                    디지털 콘텐츠의 출처와 변경 이력을 투명하게 제공
                  </Translate>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}></span>
                  <Translate id="homepage.technology.benefits.identification">
                    의도적인 잘못된 정보나 조작된 콘텐츠 식별 지원
                  </Translate>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}></span>
                  <Translate id="homepage.technology.benefits.protection">
                    콘텐츠 제작자의 권리 보호
                  </Translate>
                </li>
                <li className={styles.featureItem}>
                  <span className={styles.bullet}></span>
                  <Translate id="homepage.technology.benefits.trust">
                    미디어에 대한 신뢰 회복
                  </Translate>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
