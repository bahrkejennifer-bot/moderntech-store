import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const ChristmasCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(new Date().getFullYear(), 11, 25);
      const now = new Date();
      
      // If Christmas has passed this year, calculate for next year
      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }
      
      const difference = christmas.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-christmas-gold/20 blur-xl rounded-2xl animate-pulse" />
        <div className="relative bg-gradient-christmas border-2 border-christmas-gold/30 rounded-2xl px-6 py-4 min-w-[100px] shadow-elegant">
          <span className="text-4xl md:text-5xl font-bold font-display text-white">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
      </div>
      <span className="text-sm md:text-base font-medium text-christmas-red mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <div className="relative py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-christmas-red/5 to-transparent" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-6 w-6 text-christmas-gold animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold font-display bg-gradient-christmas bg-clip-text text-transparent">
              Countdown to Christmas
            </h2>
            <Sparkles className="h-6 w-6 text-christmas-gold animate-pulse" />
          </div>
          <p className="text-foreground/70 text-lg">
            Get ready for the most magical time of the year!
          </p>
        </div>

        <div className="flex justify-center gap-4 md:gap-8">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
};

export default ChristmasCountdown;
