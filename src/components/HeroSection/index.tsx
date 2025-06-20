import React, { useEffect, useRef, ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import {
  ArrowRight,
  Shield,
  FileText,
  Search,
  Library,
  Download,
} from 'lucide-react';
import styles from './styles.module.css';

export default function HeroSection(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 성능 최적화를 위한 throttle 적용
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (backgroundRef.current) {
            // 더 부드러운 parallax 효과를 위해 계수 조정
            backgroundRef.current.style.transform = `translateY(${
              window.scrollY * 0.3
            }px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* 배경 그라디언트 - 더 부드러운 parallax 효과 */}
      <div ref={backgroundRef} className={styles.backgroundGradient} />

      <div className={styles.container}>
        <div className={styles.content}>
          <Heading as="h1" className={styles.title}>
            {siteConfig.title}
          </Heading>
          <p className={styles.subtitle}>
            <Translate
              id="homepage.hero.subtitle"
              description="메인 페이지 히어로 섹션의 부제목"
            >
              C2PA 표준 기반의 콘텐츠 진위성 검증 API. AI 지문인식과 디지털
              서명으로 이미지·영상의 출처와 무결성을 실시간 검증합니다.
            </Translate>
          </p>

          <div className={styles.buttonGroup}>
            <Link className={styles.primaryButton} to="/docs/">
              <Library className={styles.buttonIcon} size={16} />
              <Translate
                id="homepage.hero.button.docs"
                description="API 문서 보기 버튼 텍스트"
              >
                API 문서 보기
              </Translate>
              <ArrowRight className={styles.buttonIcon} size={16} />
            </Link>
            <Link className={styles.secondaryButton} to="/docs/sdks">
              <Download className={styles.buttonIcon} size={16} />
              <Translate
                id="homepage.hero.button.sdks"
                description="SDK 다운로드 버튼 텍스트"
              >
                SDK 다운로드
              </Translate>
            </Link>
          </div>

          {/* 기능 하이라이트 */}
          <div className={styles.featureHighlights}>
            <div className={styles.featureItem}>
              <Shield className={styles.featureIcon} size={16} />
              <span>
                <Translate
                  id="homepage.hero.feature.authenticity"
                  description="콘텐츠 진위성 기능 설명"
                >
                  콘텐츠 진위성
                </Translate>
              </span>
            </div>
            <div className={styles.featureItem}>
              <FileText className={styles.featureIcon} size={16} />
              <span>
                <Translate
                  id="homepage.hero.feature.provenance"
                  description="출처 추적 기능 설명"
                >
                  출처 추적
                </Translate>
              </span>
            </div>
            <div className={styles.featureItem}>
              <Search className={styles.featureIcon} size={16} />
              <span>
                <Translate
                  id="homepage.hero.feature.verification"
                  description="디지털 검증 기능 설명"
                >
                  디지털 검증
                </Translate>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
