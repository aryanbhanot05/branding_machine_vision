import { useEffect, useState } from 'react';
import { Check, Clock, Calendar } from 'lucide-react';

interface RoadmapItem {
  id: string;
  phase: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export const Roadmap = () => {
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);

  useEffect(() => {
    fetch('/data/roadmap.json')
      .then(res => res.json())
      .then(data => setRoadmap(data))
      .catch(err => console.error('Failed to load roadmap:', err));
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-6 h-6 text-primary" aria-label="Completed" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-secondary animate-pulse" aria-label="In progress" />;
      default:
        return <Calendar className="w-6 h-6 text-muted" aria-label="Planned" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-primary shadow-glow-primary';
      case 'in-progress':
        return 'border-secondary';
      default:
        return 'border-muted/30';
    }
  };

  return (
    <section
      id="roadmap"
      className="relative py-24 px-4"
      aria-labelledby="roadmap-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 id="roadmap-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Product Roadmap
          </h2>
          <p className="text-xl text-muted-foreground">
            Our journey from prototype to production-ready platform
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-muted/30" aria-hidden="true" />

          <div className="space-y-12">
            {roadmap.map((item, index) => (
              <div
                key={item.id}
                className={`relative pl-20 animate-slide-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Status icon */}
                <div className="absolute left-4 top-0 w-8 h-8 rounded-full bg-card border-2 flex items-center justify-center">
                  {getStatusIcon(item.status)}
                </div>

                {/* Content card */}
                <div className={`glass rounded-2xl p-6 ${getStatusColor(item.status)}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-sm font-medium text-primary">{item.phase}</span>
                      <h3 className="text-2xl font-bold mt-1">{item.title}</h3>
                    </div>
                    {/* <span className="text-sm text-muted-foreground">{item.date}</span> */}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 glass rounded-2xl p-8">
          <h3 className="text-xl font-bold mb-4">Future Integrations</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Cloud TTS options for multi-language support</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Model distillation for improved performance</span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span>Federated learning research (experimental)</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
