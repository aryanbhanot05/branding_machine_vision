import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Trend {
  id: string;
  title: string;
  description: string;
  roles: string[];
  tech: string[];
}

export const EmergingTrends = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [selectedTrend, setSelectedTrend] = useState<Trend | null>(null);

  useEffect(() => {
    fetch('/data/emerging_trends.json')
      .then(res => res.json())
      .then(data => setTrends(data))
      .catch(err => console.error('Failed to load trends:', err));
  }, []);

  return (
    <section
      id="demos"
      className="relative py-24 px-4"
      aria-labelledby="trends-heading"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 id="trends-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Emerging Applications
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore innovative use cases powered by machine vision technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {trends.map((trend) => (
            <button
              key={trend.id}
              onClick={() => setSelectedTrend(selectedTrend?.id === trend.id ? null : trend)}
              className="glass rounded-xl p-6 text-left hover:shadow-glow-primary transition-all duration-300 hover:scale-105 group"
            >
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {trend.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{trend.description}</p>
              <ChevronRight className="w-5 h-5 text-primary mt-3 group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>

        {selectedTrend && (
          <div className="mt-12 glass rounded-2xl p-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">{selectedTrend.title}</h3>
            <p className="text-lg text-muted-foreground mb-6">{selectedTrend.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-primary">Key Roles</h4>
                <ul className="space-y-2">
                  {selectedTrend.roles.map((role) => (
                    <li key={role} className="flex items-center gap-2 text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary" />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-primary">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrend.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-primary/10 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
