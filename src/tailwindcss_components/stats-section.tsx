import { useEffect, useState } from 'react';

const stats = [
  { number: 5000000, label: 'Verified Users', suffix: '+' },
  { number: 99.9, label: 'Uptime', suffix: '%' },
  { number: 150, label: 'Countries', suffix: '+' },
  { number: 24, label: 'Support', suffix: '/7' },
];

function AnimatedNumber({
  targetNumber,
  duration = 2000,
  suffix = '',
}: {
  targetNumber: number;
  duration?: number;
  suffix?: string;
}) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    const endTime = startTime + duration;

    const updateNumber = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      setCurrentNumber(Math.floor(targetNumber * progress));

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setCurrentNumber(targetNumber);
      }
    };

    updateNumber();
  }, [targetNumber, duration]);

  return (
    <span>
      {currentNumber.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats-section" className="py-20 bg-primary text-white">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted Worldwide
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Join millions of users who trust BornID for their digital identity
            needs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {isVisible ? (
                  <AnimatedNumber
                    targetNumber={stat.number}
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                  />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <div className="text-primary-foreground/80 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
