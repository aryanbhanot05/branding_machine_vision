import { useState, FormEvent } from 'react';
import { Mail, Github, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    collaborate: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const FORMSPREE_URL = 'https://formspree.io/f/mkgqbqrw';


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          collaborate: formData.collaborate,
        }),
      });

      if (response.ok) {
        toast.success("Thank you! We'll be in touch soon.");
        setFormData({ name: '', email: '', message: '', collaborate: false });
      } else {
        toast.error("There was an issue sending your message. Please try again.");
      }
    } catch (error) {
      toast.error("Could not connect to the server. Check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-4"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground">
            Interested in collaborating or have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>

              <div className="space-y-4">
                <a
                  href="https://github.com/aryanbhanot05/Tune_Space_2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-primary/10 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Github className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">GitHub Repository</p>
                    <p className="text-sm text-muted-foreground">View source code & contribute</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:aryanbhanot2005@gmail.com"
                      className="text-sm text-muted-foreground underline hover:text-primary transition-colors"
                    >
                      aryanbhanot2005@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Project Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-sm">MIT License</span>
                  <span className="px-3 py-1 rounded-full bg-secondary/10 text-sm">Open Source</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  We welcome contributions from the community. Check out our contributor guide on GitHub.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background/50"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background/50"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="bg-background/50 min-h-32"
                placeholder="Tell us about your interest or inquiry..."
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="collaborate"
                checked={formData.collaborate}
                onCheckedChange={(checked) => setFormData({ ...formData, collaborate: checked as boolean })}
              />
              <label htmlFor="collaborate" className="text-sm cursor-pointer">
                I'm interested in collaborating on this project
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary-700 gap-2"
              disabled={isSubmitting}
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
