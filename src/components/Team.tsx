import { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  qr: string;
  ppf: string;
}

export const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [showQRGallery, setShowQRGallery] = useState(false);

  useEffect(() => {
    fetch('/data/team.json')
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.error('Failed to load team:', err));
  }, []);

  return (
    <section
      id="team"
      className="relative py-24 px-4"
      aria-labelledby="team-heading"
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 id="team-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Meet the Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The innovators behind See the Future's vision technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {team.map((member) => (
            <div
              key={member.id}
              className="glass rounded-2xl p-8 text-center hover:shadow-glow-primary transition-all duration-300"
            >
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold">
                <img
                    src={member.ppf}
                    alt={`PPF code for ${member.name}`}
                    className="w-32 h-auto rounded-full"
                  />
              </div>
              
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-primary text-sm mb-4">{member.role}</p>
              <p className="text-muted-foreground text-sm mb-6">{member.bio}</p>

              <div className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10"
                >
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => setShowQRGallery(!showQRGallery)}
            size="lg"
            className="bg-primary hover:bg-primary-700"
          >
            {showQRGallery ? 'Hide' : 'Show'} All QR Codes
          </Button>
        </div>

        {showQRGallery && (
          <div className="mt-12 glass rounded-2xl p-8 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 text-center">Scan to Connect</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={`qr-${member.id}`} className="text-center">
                  <img
                    src={member.qr}
                    alt={`QR code for ${member.name}`}
                    className="w-full h-auto rounded-lg border border-primary/20 mb-3"
                  />
                  <p className="text-sm font-medium">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
