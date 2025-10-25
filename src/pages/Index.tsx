import { InteractiveBackground } from '@/components/InteractiveBackground';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Features } from '@/components/Features';
import { EmergingTrends } from '@/components/EmergingTrends';
import { Team } from '@/components/Team';
import { Roadmap } from '@/components/Roadmap';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Interactive particle background */}
      <InteractiveBackground />

      {/* Main content with relative positioning */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Features />
          <EmergingTrends />
          <Team />
          <Roadmap />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
