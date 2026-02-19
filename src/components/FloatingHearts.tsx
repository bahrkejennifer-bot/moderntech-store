import { Clover } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingClover {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export const FloatingHearts = () => {
  const [clovers, setClovers] = useState<FloatingClover[]>([]);

  useEffect(() => {
    const generated: FloatingClover[] = [];
    for (let i = 0; i < 20; i++) {
      generated.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        size: 12 + Math.random() * 24,
        opacity: 0.3 + Math.random() * 0.4,
      });
    }
    setClovers(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {clovers.map((clover) => (
        <div
          key={clover.id}
          className="absolute animate-float-up"
          style={{
            left: `${clover.left}%`,
            animationDelay: `${clover.delay}s`,
            animationDuration: `${clover.duration}s`,
          }}
        >
          <Clover
            className="text-emerald-500 fill-emerald-400"
            style={{
              width: clover.size,
              height: clover.size,
              opacity: clover.opacity,
            }}
          />
        </div>
      ))}
    </div>
  );
};
