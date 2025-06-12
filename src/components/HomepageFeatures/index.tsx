import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'C2PA 표준 기반',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        국제 표준 C2PA를 완전히 준수하여 Adobe, Microsoft 등 주요 업체의
        도구와 완벽하게 호환됩니다. 디지털 서명과 메타데이터로 콘텐츠 무결성을 보장합니다.
      </>
    ),
  },
  {
    title: 'AI 지문인식 기술',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        CNN 기반 딥러닝으로 이미지와 영상의 고유한 특징을 추출합니다.
        압축, 크기 조정에도 견고한 <code>Fingerprinting</code> 기술을 제공합니다.
      </>
    ),
  },
  {
    title: '개발자 친화적 SDK',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        JavaScript, Python, Java, Swift 등 다양한 언어로 제공되는 SDK로
        쉽고 빠르게 Content Authenticity 기능을 통합할 수 있습니다.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
