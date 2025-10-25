import { useState, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ABOUT_TEXT = "Using your phone camera, our app detects objects in real time, names them, and gives a short contextual description — powered by computer vision and AI.";

export const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = () => {
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported in your browser');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    utteranceRef.current = new SpeechSynthesisUtterance(ABOUT_TEXT);
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.pitch = 1.0;
    
    // Try to use a natural voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Natural'));
    if (preferredVoice) {
      utteranceRef.current.voice = preferredVoice;
    }

    utteranceRef.current.onstart = () => setIsPlaying(true);
    utteranceRef.current.onend = () => setIsPlaying(false);
    utteranceRef.current.onerror = () => {
      setIsPlaying(false);
      toast.error('Failed to play audio');
    };

    if (!isMuted) {
      window.speechSynthesis.speak(utteranceRef.current);
    }
  };

  return (
    <section
      id="about"
      className="relative py-24 px-4"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="glass rounded-3xl p-12 shadow-glow-primary">
          <h2 id="about-heading" className="text-4xl font-bold mb-8 text-center">
            AI-Powered Vision at Your Fingertips
          </h2>

          <div className="space-y-6">
            <p className="text-lg text-foreground leading-relaxed">
              {ABOUT_TEXT}
            </p>

            <div className="flex items-center gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={speak}
                className="bg-primary hover:bg-primary-700 gap-2"
                aria-label={isPlaying ? 'Pause voice playback' : 'Play voice demo'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                {isPlaying ? 'Pause' : 'Hear This'}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="border-primary/30"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-2">
              <p>Voice output uses Web Speech API for natural, accessible audio feedback</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
