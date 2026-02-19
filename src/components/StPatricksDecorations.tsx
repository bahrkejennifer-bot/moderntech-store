import { Clover } from "lucide-react";

export const StPatricksDecorations = () => {
  return (
    <>
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
