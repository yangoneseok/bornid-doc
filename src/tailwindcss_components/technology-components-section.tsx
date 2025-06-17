import { useEffect, useRef, useState } from 'react';
import { FileText, FileLock, FileCode } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const components = [
  {
    icon: FileText,
    title: '매니페스트',
    description:
      'C2PA의 핵심 데이터 구조로, 자산(에셋)의 프로비넌스 정보를 담고 있으며 다음 요소로 구성됩니다.',
    details: ['Assertions', 'Claim', 'Claim Signature'],
  },
  {
    icon: FileLock,
    title: '바인딩',
    description:
      '콘텐츠와 매니페스트를 연결하는 메커니즘으로, 두가지 유형이 있습니다.',
    details: ['Hard Binding', 'Soft Binding'],
  },
  {
    icon: FileCode,
    title: '신뢰 모델',
    description:
      'C2PA는 X.509 인증서를 사용한 디지털 서명을 통해 콘텐츠의 진위성을 검증합니다.',
    details: ['C2PA 신뢰 목록', 'C2PA TSA 신뢰 목록', '검증 상태'],
  },
];

export function TechnologyComponentsSection() {
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
    <section className="py-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            기술 구성 요소
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {components.map((component, index) => (
            <Card
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border-0 bg-white/70 dark:bg-slate-800/70 backdrop-blur ${
                visibleCards[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <component.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">{component.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {component.description}
                </p>
                <ul className="space-y-2">
                  {component.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center text-sm text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
