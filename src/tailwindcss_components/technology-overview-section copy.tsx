import { useEffect, useRef, useState } from 'react';

export function TechnologyOverviewSection() {
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
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
    >
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">기술 개요</h2>
        </div>

        <div className="max-w-6xl mx-auto space-y-20">
          {/* C2PA 설명 */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">
                C2PA(Coalition for Content Provenance and Authenticity)란?
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                디지털 콘텐츠의 출처와 진위성을 검증할 수 있는 개방형 기술
                표준입니다. '콘텐츠 크레덴셜'(Content Credentials)이라고도
                불리는 이 기술은 디지털 미디어의 생성부터 편집, 배포까지 전
                과정에 걸친 이력(프로비넌스)을 안전하게 기록하고 추적할 수 있게
                합니다.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-muted-foreground">C2PA 기술 개념도</p>
            </div>
          </div>

          {/* 콘텐츠 크레덴셜 필요성 */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg aspect-video flex items-center justify-center">
                <p className="text-muted-foreground">콘텐츠 검증 과정</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold mb-6">
                콘텐츠 크레덴셜(Content Credentials)의 필요성
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                디지털 콘텐츠의 조작이 쉬워지고 허위정보가 빠르게 확산되는
                환경에서, 콘텐츠의 출처와 변경 이력을 신뢰할 수 있는 방법으로
                기록하고 검증할 필요성이 증가하고 있습니다. C2PA 개방형 기술
                표준은 다음과 같은 문제를 해결하기 위해 개발되었습니다.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  디지털 콘텐츠의 출처와 변경 이력을 투명하게 제공
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  의도적 허위정보나 조작된 콘텐츠 식별 지원
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  콘텐츠 제작자의 권리 보호
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  미디어에 대한 신뢰 회복
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
