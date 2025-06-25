import React, { ReactNode } from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';
import { useRevealOnScroll } from '@site/src/hooks/useRevealOnScroll';

import Case1Icon from '@site/static/img/icons/case1.png';
import Case2Icon from '@site/static/img/icons/case2.png';
import Case3Icon from '@site/static/img/icons/case3.png';
import Case4Icon from '@site/static/img/icons/case4.png';

export default function UseCasesSection(): ReactNode {
  const containerRef = useRevealOnScroll<HTMLDivElement>({
    itemSelector: `.${styles.useCaseItemWrapper}`,
    visibleClass: styles.visible,
    threshold: 0.1,
  });

  const useCases = [
    {
      titleKey: 'homepage.usecases.journalism.title',
      title: '저널리즘/소셜미디어',
      items: [
        {
          key: 'homepage.usecases.journalism.item1',
          text: '뉴스 콘텐츠의 출처와 편집 이력 제공',
        },
        {
          key: 'homepage.usecases.journalism.item2',
          text: '업로드 콘텐츠의 출처 검증',
        },
      ],
      icon: Case1Icon,
      colorClass: styles.blue,
      position: 'topLeft',
    },
    {
      titleKey: 'homepage.usecases.creative.title',
      title: '창작 산업',
      items: [
        {
          key: 'homepage.usecases.creative.item1',
          text: '디지털 콘텐츠의 저작권 보호 및 출처 명시',
        },
      ],
      icon: Case2Icon,
      colorClass: styles.cyan,
      position: 'topRight',
    },
    {
      titleKey: 'homepage.usecases.ai.title',
      title: 'AI 생성 콘텐츠',
      items: [
        {
          key: 'homepage.usecases.ai.item1',
          text: 'AI로 생성된 콘텐츠 표시 및 사용된 모델 정보 제공',
        },
      ],
      icon: Case3Icon,
      colorClass: styles.cyan,
      position: 'bottomLeft',
    },
    {
      titleKey: 'homepage.usecases.government.title',
      title: '정부/공공기관',
      items: [
        {
          key: 'homepage.usecases.government.item1',
          text: '공식 문서 및 기록의 진위성 보장',
        },
      ],
      icon: Case4Icon,
      colorClass: styles.blue,
      position: 'bottomRight',
    },
  ];

  const renderUseCase = (useCase) => {
    const isLeft = useCase.position.includes('Left');
    const description = (
      <div className={styles.useCaseDescription}>
        <h3 className={styles.useCaseTitle}>
          <Translate id={useCase.titleKey}>{useCase.title}</Translate>
        </h3>
        <ul className={styles.useCaseList}>
          {useCase.items.map((item, index) => (
            <li key={index} className={styles.useCaseListItem}>
              <Translate id={item.key}>{item.text}</Translate>
            </li>
          ))}
        </ul>
      </div>
    );
    const card = (
      <div className={`${styles.useCaseCard} ${useCase.colorClass}`}>
        <img
          src={useCase.icon}
          alt={useCase.title}
          className={styles.useCaseIcon}
        />
      </div>
    );

    return (
      <div className={styles.useCaseItemWrapper}>
        {isLeft ? (
          <>
            {description}
            {card}
          </>
        ) : (
          <>
            {card}
            {description}
          </>
        )}
      </div>
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Translate id="homepage.usecases.title">적용 사례</Translate>
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.grid} ref={containerRef}>
            {useCases.map((useCase) => (
              <div key={useCase.position} className={styles[useCase.position]}>
                {renderUseCase(useCase)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
