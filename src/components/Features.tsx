import { useEffect, useState } from 'react';
import { Eye, MessageSquare, Volume2, Camera, Sparkles, Cpu, LucideIcon } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, LucideIcon> = {
  Eye,
  MessageSquare,
  Volume2,
  Camera,
  Sparkles,
  Cpu,
};

export const Features = () => {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    fetch('/data/features.json')
      .then(res => res.json())
      .then(data => setFeatures(data))
      .catch(err => console.error('Failed to load features:', err));
  }, []);

  return (
    <section
      id="features"
      className="relative py-24 px-4"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Core Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technology designed for seamless real-time object recognition
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.id}
                className="glass rounded-2xl p-8 hover:shadow-glow-primary transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  {Icon && <Icon className="w-7 h-7 text-primary" aria-hidden="true" />}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
