import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChristmasMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    // Force the audio element to reload the current src (helps with hot-reload/caching)
    audioRef.current.load();
    void audioRef.current.play();
    setIsPlaying(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="https://incompetech.com/music/royalty-free/mp3-royaltyfree/Jingle%20Bells%20Calm.mp3?v=2"
        preload="none"
      />
      <Button
        onClick={toggleMusic}
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-50 rounded-full w-14 h-14 bg-christmas-red/90 border-christmas-gold text-white hover:bg-christmas-red hover:text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? <Volume2 className="h-6 w-6" /> : <VolumeX className="h-6 w-6" />}
      </Button>
    </>
  );
};

export default ChristmasMusic;
