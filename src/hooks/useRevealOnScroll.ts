import { useEffect, useRef } from 'react';

interface UseRevealOnScrollOptions {
  threshold?: number;
  itemSelector: string;
  visibleClass: string;
  animationDelayBase?: number;
}

export function useRevealOnScroll<T extends HTMLElement>({
  threshold = 0.1,
  itemSelector,
  visibleClass,
  animationDelayBase = 100,
}: UseRevealOnScrollOptions) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 옵저버 콜백: data-index 속성을 사용해 애니메이션 딜레이를 설정
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          const index = parseInt(target.dataset.index || '0', 10);

          // 애니메이션 딜레이를 동적으로 설정
          // CSS에서 이 변수를 사용하여 transition-delay를 적용할 수 있음
          target.style.setProperty(
            '--animation-delay',
            `${index * animationDelayBase}ms`
          );
          target.classList.add(visibleClass);

          // 한 번 애니메이션이 적용된 요소는 더 이상 관찰하지 않음
          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(callback, { threshold });

    // itemSelector로 지정된 모든 자식 요소를 관찰 대상으로 등록
    const items = container.querySelectorAll(itemSelector);
    items.forEach((item) => observer.observe(item));

    // 컴포넌트 언마운트 시 옵저버 연결 해제
    return () => observer.disconnect();
  }, [containerRef, threshold, itemSelector, visibleClass, animationDelayBase]);

  return containerRef;
}
