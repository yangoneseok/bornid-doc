import React, { useEffect, useState, ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useColorMode } from '@docusaurus/theme-common';
import Heading from '@theme/Heading';
import { ArrowRight, Shield, FileText, Search } from 'lucide-react';
import styles from './styles.module.css';

export default function HeroSection(): ReactNode {
  const { siteConfig, i18n } = useDocusaurusContext();
  const [scrollY, setScrollY] = useState(0);
  const isEnglish = i18n.currentLocale === 'en';

  useEffect(() => {
    // 성능 최적화를 위한 throttle 적용
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // 더 부드러운 parallax 효과를 위해 계수 조정
          setScrollY(window.scrollY);
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
      <div
        className={styles.backgroundGradient}
        style={{
          // 부드러운 parallax 효과로 조정 (기존 0.5 → 0.3)
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      />

      <div className={styles.container}>
        <div className={styles.content}>
          <Heading as="h1" className={styles.title}>
            {siteConfig.title}
          </Heading>
          <p className={styles.subtitle}>
            {isEnglish
              ? 'C2PA standard-based content authenticity verification API. Real-time verification of image and video origin and integrity through AI fingerprinting and digital signatures.'
              : 'C2PA 표준 기반의 콘텐츠 진위성 검증 API. AI 지문인식과 디지털 서명으로 이미지·영상의 출처와 무결성을 실시간 검증합니다.'}
          </p>

          <div className={styles.buttonGroup}>
            <Link className={styles.primaryButton} to="/docs/">
              {isEnglish ? '📚 View API Docs' : '📚 API 문서 보기'}
              <ArrowRight className={styles.buttonIcon} size={16} />
            </Link>
            <Link className={styles.secondaryButton} to="/docs/sdks">
              {isEnglish ? '🚀 Download SDKs' : '🚀 SDK 다운로드'}
            </Link>
          </div>

          {/* 기능 하이라이트 */}
          <div className={styles.featureHighlights}>
            <div className={styles.featureItem}>
              <Shield className={styles.featureIcon} size={16} />
              <span>
                {isEnglish ? 'Content Authenticity' : '콘텐츠 진위성'}
              </span>
            </div>
            <div className={styles.featureItem}>
              <FileText className={styles.featureIcon} size={16} />
              <span>{isEnglish ? 'Provenance Tracking' : '출처 추적'}</span>
            </div>
            <div className={styles.featureItem}>
              <Search className={styles.featureIcon} size={16} />
              <span>{isEnglish ? 'Digital Verification' : '디지털 검증'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
