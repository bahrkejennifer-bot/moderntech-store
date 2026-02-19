export const StPatricksDecorations = () => {
  return (
    <>
      {/* Top-left leprechaun */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none">
        <span className="text-4xl md:text-5xl drop-shadow-lg" role="img" aria-label="Leprechaun">🧙‍♂️</span>
      </div>

      {/* Top-right leprechaun */}
      <div className="absolute top-2 right-2 z-20 pointer-events-none scale-x-[-1]">
        <span className="text-4xl md:text-5xl drop-shadow-lg" role="img" aria-label="Leprechaun">🧙‍♂️</span>
      </div>

      {/* Bottom-left leprechaun */}
      <div className="absolute bottom-20 left-2 z-20 pointer-events-none">
        <span className="text-4xl md:text-5xl drop-shadow-lg" role="img" aria-label="Leprechaun">🧌</span>
      </div>

      {/* Bottom-right leprechaun */}
      <div className="absolute bottom-20 right-2 z-20 pointer-events-none scale-x-[-1]">
        <span className="text-4xl md:text-5xl drop-shadow-lg" role="img" aria-label="Leprechaun">🧌</span>
      </div>
    </>
  );
};
