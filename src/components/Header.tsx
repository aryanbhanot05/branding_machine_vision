import { useState, useEffect } from 'react';
import { Eye, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-glow-primary' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between" aria-label="Main navigation">
        <div className="flex items-center gap-2">
          <Eye className="w-8 h-8 text-primary" aria-hidden="true" />
          <span className="text-xl font-bold">Vision</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection('home')} className="hover:text-primary transition-colors">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">
            About
          </button>
          <button onClick={() => scrollToSection('features')} className="hover:text-primary transition-colors">
            Features
          </button>
          <button onClick={() => scrollToSection('demos')} className="hover:text-primary transition-colors">
            Demos
          </button>
          <button onClick={() => scrollToSection('team')} className="hover:text-primary transition-colors">
            Team
          </button>
          <button onClick={() => scrollToSection('roadmap')} className="hover:text-primary transition-colors">
            Roadmap
          </button>
          <a
            href="https://github.com/aryanbhanot05"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <button onClick={() => scrollToSection('contact')} className="hover:text-primary transition-colors">
            Contact
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="bg-primary hover:bg-primary-700 text-white font-medium"
            aria-label="Try demo on GitHub"
          >
            <a href="https://github.com/aryanbhanot05/vision" target="_blank" rel="noopener noreferrer">
              Try Demo
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
};
