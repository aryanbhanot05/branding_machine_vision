import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import heroPhone from '@/assets/hero-phone.png';

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 px-4"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-fade-in">
          <h1 id="hero-heading" className="text-5xl md:text-7xl font-bold leading-tight">
            See the Future —{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Real-Time Object Detection
            </span>{' '}
            in Your Pocket.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            Harness the power of computer vision and AI to instantly identify and understand the world around you.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-700 text-white font-medium shadow-glow-primary"
            >
              <a href="https://github.com/aryanbhanot05/see_the_future" target="_blank" rel="noopener noreferrer">
                Try the Demo
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
              onClick={() => scrollToSection('about')}
            >
              See Technology
            </Button>
          </div>
        </div>

        <div className="relative animate-float">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
          <img
            src={heroPhone}
            alt="Smartphone showing real-time object detection interface with glowing blue bounding boxes"
            className="relative z-10 w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>

      <button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-6 h-6 text-primary" />
      </button>
    </section>
  );
};
