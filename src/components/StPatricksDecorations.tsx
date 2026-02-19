import { Clover } from "lucide-react";
import leprechaunImg from "@/assets/leprechaun-dancing.jpg";

export const StPatricksDecorations = () => {
  return (
    <>
      {/* Bouncing leprechaun image - top center */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <img
          src={leprechaunImg}
          alt="Dancing leprechaun"
          className="h-16 w-16 md:h-24 md:w-24 rounded-full object-cover border-2 border-emerald-400/60 shadow-lg animate-bounce"
        />
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
