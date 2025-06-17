export function UseCasesSection() {
  const useCases = [
    {
      title: '저널리즘/소셜 미디어',
      items: [
        '뉴스 콘텐츠의 출처와 편집 이력 제공',
        '업로드 콘텐츠의 출처 검증',
      ],
      position: 'top-left',
    },
    {
      title: '창작 산업',
      items: ['디지털 콘텐츠의 저작권 보호 및 출처 명시'],
      position: 'top-right',
    },
    {
      title: 'AI 생성 콘텐츠',
      items: ['AI로 생성된 콘텐츠 표시 및 사용된 모델 정보 제공'],
      position: 'bottom-left',
    },
    {
      title: '정부/공공기관',
      items: ['공식 문서 및 기록의 진위성 보장'],
      position: 'bottom-right',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">적용 사례</h2>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative grid grid-cols-2 gap-8 md:gap-16">
            {/* 중앙 이미지 */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 md:w-80 md:h-80">
                <div className="w-full h-full bg-muted/30 rounded-lg grid grid-cols-2 gap-1 p-1">
                  <div className="bg-muted/50 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">1</span>
                  </div>
                  <div className="bg-muted/50 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">2</span>
                  </div>
                  <div className="bg-muted/50 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">3</span>
                  </div>
                  <div className="bg-muted/50 rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 왼쪽 상단 */}
            <div className="flex justify-end pr-16 md:pr-24">
              <div className="max-w-xs text-right">
                <h3 className="text-xl font-bold mb-3">{useCases[0].title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {useCases[0].items.map((item, index) => (
                    <li key={index} className="flex items-start justify-end">
                      <span>{item}</span>
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5 ml-2 flex-shrink-0"></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 오른쪽 상단 */}
            <div className="flex justify-start pl-16 md:pl-24">
              <div className="max-w-xs">
                <h3 className="text-xl font-bold mb-3">{useCases[1].title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {useCases[1].items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 왼쪽 하단 */}
            <div className="flex justify-end pr-16 md:pr-24">
              <div className="max-w-xs text-right">
                <h3 className="text-xl font-bold mb-3">{useCases[2].title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {useCases[2].items.map((item, index) => (
                    <li key={index} className="flex items-start justify-end">
                      <span>{item}</span>
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5 ml-2 flex-shrink-0"></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 오른쪽 하단 */}
            <div className="flex justify-start pl-16 md:pl-24">
              <div className="max-w-xs">
                <h3 className="text-xl font-bold mb-3">{useCases[3].title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {useCases[3].items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
