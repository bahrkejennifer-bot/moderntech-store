import { useEffect } from "react";

const PINTEREST_USERNAME = "moderntechllc";

/** Loads the Pinterest SDK once, re-parses widgets on mount */
const usePinterestSDK = () => {
  useEffect(() => {
    const id = "pinterest-jssdk";
    if (!document.getElementById(id)) {
      const script = document.createElement("script");
      script.id = id;
      script.async = true;
      script.defer = true;
      script.src = "https://assets.pinterest.com/js/pinit.js";
      script.setAttribute("data-pin-build", "parsePinButtons");
      document.body.appendChild(script);
      script.onload = () => {
        (window as any).parsePinButtons?.();
      };
    } else {
      // SDK already loaded — re-parse new widgets
      setTimeout(() => (window as any).parsePinButtons?.(), 300);
    }
  }, []);
};

/** Follow button — small inline widget */
export const PinterestFollowButton = () => {
  usePinterestSDK();
  return (
    <a
      data-pin-do="buttonFollow"
      href={`https://www.pinterest.com/${PINTEREST_USERNAME}/`}
      className="inline-block"
    >
      Modern Tech
    </a>
  );
};

/** Save button — use on any image/product */
export const PinterestSaveButton = ({
  url,
  media,
  description,
}: {
  url: string;
  media: string;
  description: string;
}) => {
  usePinterestSDK();
  return (
    <a
      data-pin-do="buttonPin"
      data-pin-tall="true"
      data-pin-round="true"
      href={`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(media)}&description=${encodeURIComponent(description)}`}
    />
  );
};

/** Embeds a single Pin */
export const PinterestPinWidget = ({ pinUrl }: { pinUrl: string }) => {
  usePinterestSDK();
  return (
    <a data-pin-do="embedPin" data-pin-width="medium" href={pinUrl} />
  );
};

/** Embeds a Pinterest board */
export const PinterestBoardWidget = ({
  boardUrl,
  width = 400,
  height = 320,
  columns = 3,
}: {
  boardUrl: string;
  width?: number;
  height?: number;
  columns?: number;
}) => {
  usePinterestSDK();
  return (
    <a
      data-pin-do="embedBoard"
      data-pin-board-width={width}
      data-pin-scale-height={height}
      data-pin-scale-width={columns * 60}
      href={boardUrl}
    />
  );
};

/** Embeds the Pinterest profile */
export const PinterestProfileWidget = ({
  width = 400,
  height = 320,
}: {
  width?: number;
  height?: number;
}) => {
  usePinterestSDK();
  return (
    <a
      data-pin-do="embedUser"
      data-pin-board-width={width}
      data-pin-scale-height={height}
      data-pin-scale-width={180}
      href={`https://www.pinterest.com/${PINTEREST_USERNAME}/`}
    />
  );
};

/** Full Pinterest section with Board + Profile widgets */
const PinterestWidgets = () => {
  return (
    <section className="border-t border-border py-12 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Find Us on Pinterest
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Discover curated tech boards, product pins & buying guides
          </p>
          <PinterestFollowButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start justify-items-center">
          {/* Board widget — Health & Wellness board */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Featured Board
            </h3>
            <PinterestBoardWidget
              boardUrl={`https://www.pinterest.com/${PINTEREST_USERNAME}/health-wellness/`}
              width={380}
              height={300}
              columns={3}
            />
          </div>

          {/* Profile widget */}
          <div className="text-center">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Our Profile
            </h3>
            <PinterestProfileWidget width={380} height={300} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PinterestWidgets;
