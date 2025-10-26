import { Eye, Github } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <footer className="relative py-12 px-4 border-t border-primary/10" role="contentinfo">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold">Vision</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time object detection powered by computer vision and AI.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPrivacy(true)}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </button>
                <a
                  href="https://github.com/aryanbhanot05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/aryanbhanot05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="Visit our GitHub repository"
                >
                  <Github className="w-5 h-5 text-primary" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Team Vision. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Privacy & Data Policy</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold mb-2">Local Processing First</h3>
              <p className="text-muted-foreground">
                By default, all camera frames are processed locally in your browser. We do not send images or video to external servers without your explicit consent.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Cloud Processing (Optional)</h3>
              <p className="text-muted-foreground">
                If you opt into cloud processing for enhanced features, we will clearly indicate what data is being transmitted and where it is stored. You maintain full control and can revoke consent at any time.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Ethical AI Commitment</h3>
              <p className="text-muted-foreground">
                We are committed to responsible AI development. Our models are trained on diverse datasets with active bias mitigation strategies. We continuously monitor and improve fairness across different demographics and use cases.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Your Rights</h3>
              <p className="text-muted-foreground">
                You have the right to access, modify, or delete any data associated with your use of this application. Contact us at contact@see-the-future.ai for data requests.
              </p>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
