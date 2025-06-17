import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, FileText, Search } from 'lucide-react';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Background gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-indigo-500/20 rounded-full blur-2xl animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-20 h-20 bg-purple-500/15 rounded-full blur-xl animate-float"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent animate-fade-in">
            Born to Identify
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            Revolutionizing digital identity verification with cutting-edge
            technology. Secure, fast, and reliable identity solutions for the
            modern world.
          </p>

          <div
            className="flex justify-center mb-12 animate-fade-in"
            style={{ animationDelay: '0.4s' }}
          >
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Docs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Feature highlights */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span>Content Authenticity</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4 text-primary" />
              <span>Provenance Tracking</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Search className="h-4 w-4 text-primary" />
              <span>Digital Verification</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
