import { Clover } from "lucide-react";

export const StPatricksDecorations = () => {
  return (
    <>
      {/* Top-left cluster */}
      <div className="absolute top-3 left-3 z-20 flex flex-col items-start gap-1 pointer-events-none">
        <div className="flex items-center gap-1">
          <Clover className="h-7 w-7 text-emerald-400 fill-emerald-300/60 drop-shadow-lg" />
          <Clover className="h-4 w-4 text-green-300 fill-green-200/50 drop-shadow -rotate-12" />
        </div>
        <Clover className="h-5 w-5 text-emerald-500 fill-emerald-400/40 drop-shadow ml-1 rotate-12" />
      </div>

      {/* Top-right cluster */}
      <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-center gap-1">
          <Clover className="h-4 w-4 text-green-300 fill-green-200/50 drop-shadow rotate-12" />
          <Clover className="h-7 w-7 text-emerald-400 fill-emerald-300/60 drop-shadow-lg" />
        </div>
        <Clover className="h-5 w-5 text-emerald-500 fill-emerald-400/40 drop-shadow mr-1 -rotate-12" />
      </div>

      {/* Bottom-left leprechaun + clover */}
      <div className="absolute bottom-20 left-4 z-20 pointer-events-none flex items-end gap-2">
        <span className="text-3xl drop-shadow-lg" role="img" aria-label="Leprechaun">🍀</span>
        <span className="text-2xl drop-shadow-lg -mb-1" role="img" aria-label="Leprechaun hat">🎩</span>
      </div>

      {/* Bottom-right leprechaun + clover */}
      <div className="absolute bottom-20 right-4 z-20 pointer-events-none flex items-end gap-2">
        <span className="text-2xl drop-shadow-lg -mb-1" role="img" aria-label="Leprechaun hat">🎩</span>
        <span className="text-3xl drop-shadow-lg" role="img" aria-label="Shamrock">☘️</span>
      </div>

      {/* Left edge scattered */}
      <div className="absolute top-1/2 left-2 z-20 pointer-events-none -translate-y-1/2">
        <Clover className="h-5 w-5 text-emerald-400/70 fill-emerald-300/30 drop-shadow rotate-45" />
      </div>

      {/* Right edge scattered */}
      <div className="absolute top-1/2 right-2 z-20 pointer-events-none -translate-y-1/2">
        <Clover className="h-5 w-5 text-emerald-400/70 fill-emerald-300/30 drop-shadow -rotate-45" />
      </div>

      {/* Gold coin accents */}
      <div className="absolute top-12 right-12 z-20 pointer-events-none hidden md:block">
        <span className="text-xl drop-shadow-lg" role="img" aria-label="Gold coin">🪙</span>
      </div>
      <div className="absolute bottom-28 left-12 z-20 pointer-events-none hidden md:block">
        <span className="text-xl drop-shadow-lg" role="img" aria-label="Gold coin">🪙</span>
      </div>
    </>
  );
};
