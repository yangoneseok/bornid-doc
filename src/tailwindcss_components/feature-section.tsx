import { useEffect, useRef, useState } from 'react';
import { FileX, Copyright, FileLock, ShieldX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: FileX,
    title: '가짜뉴스 생성',
    description:
      '허위 정보가 뉴스 형식으로 제공되어 개인 및 단체의 평판 훼손 및 사회 혼란 초래',
  },
  {
    icon: Copyright,
    title: '저작권 분쟁',
    description: 'AI 생성 콘텐츠로 인한 지적재산권 침해 및 소유권 논란 발생',
  },
  {
    icon: FileLock,
    title: '디지털 성범죄',
    description:
      '딥페이크 기술 악용으로 인한 프라이버시 침해 및 범죄 위험 증가',
  },
  {
    icon: ShieldX,
    title: '콘텐츠 위·변조',
    description: '콘텐츠 위·변조로 사사적 신뢰도 저하',
  },
];

export function FeaturesSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(features.length).fill(false)
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
            }, index * 100);
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
    <section
      id="features"
      className="py-24 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20"
    >
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose BornID?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the future of digital identity with our comprehensive
            suite of features designed for security, speed, and simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
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
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
