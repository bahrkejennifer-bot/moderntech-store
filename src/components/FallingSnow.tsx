import { useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
  delay: number;
}

const FallingSnow = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: Math.random() * 8 + 8,
        opacity: Math.random() * 0.6 + 0.4,
        size: Math.random() * 8 + 4,
        delay: Math.random() * 10,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-snowfall"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-full h-full drop-shadow-lg">
            <path d="M12 0L13.5 6H10.5L12 0ZM12 24L10.5 18H13.5L12 24ZM0 12L6 10.5V13.5L0 12ZM24 12L18 13.5V10.5L24 12ZM3.51 3.51L8.5 7L7 8.5L3.51 3.51ZM20.49 20.49L15.5 17L17 15.5L20.49 20.49ZM3.51 20.49L7 15.5L8.5 17L3.51 20.49ZM20.49 3.51L17 8.5L15.5 7L20.49 3.51Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FallingSnow;
