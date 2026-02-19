import { Clover } from "lucide-react";

export const StPatricksDecorations = () => {
  return (
    <>
      {/* Bouncing leprechaun on pot of gold - top center */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <span className="text-3xl md:text-4xl drop-shadow-lg animate-bounce" role="img" aria-label="Leprechaun">🧌</span>
        <span className="text-2xl md:text-3xl drop-shadow-lg -mt-2" role="img" aria-label="Pot of gold">🪙🏺🪙</span>
      </div>

      {/* Top-left clover */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none">
        <Clover className="h-8 w-8 md:h-10 md:w-10 text-emerald-400 fill-emerald-300/60 drop-shadow-lg -rotate-12" />
      </div>

      {/* Top-right clover */}
      <div className="absolute top-3 right-3 z-20 pointer-events-none">
        <Clover className="h-8 w-8 md:h-10 md:w-10 text-emerald-400 fill-emerald-300/60 drop-shadow-lg rotate-12" />
      </div>

      {/* Bottom-left clover */}
      <div className="absolute bottom-20 left-3 z-20 pointer-events-none">
        <Clover className="h-8 w-8 md:h-10 md:w-10 text-emerald-400 fill-emerald-300/60 drop-shadow-lg rotate-12" />
      </div>

      {/* Bottom-right clover */}
      <div className="absolute bottom-20 right-3 z-20 pointer-events-none">
        <Clover className="h-8 w-8 md:h-10 md:w-10 text-emerald-400 fill-emerald-300/60 drop-shadow-lg -rotate-12" />
      </div>
    </>
  );
};
