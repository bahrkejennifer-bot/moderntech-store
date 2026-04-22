import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import AffiliateFooter from "@/components/AffiliateFooter";

// Product images
import airpodsImage from "@/assets/products/airpods-pro-2.jpg";
import fitbitImage from "@/assets/products/fitbit-charge-6.jpg";
import tileImage from "@/assets/products/tile-pro-tracker.jpg";
import echoShowImage from "@/assets/products/echo-show-8.jpg";
import boseHeadphonesImage from "@/assets/products/bose-qc45-headphones.jpg";
import sonyHeadphonesImage from "@/assets/products/sony-wh-1000xm5.jpg";
import ipadImage from "@/assets/products/ipad-10th-gen.jpg";
import metaQuestImage from "@/assets/products/meta-quest-3.jpg";
import macbookImage from "@/assets/products/macbook-air-m4.jpg";
import logitechMouseImage from "@/assets/products/logitech-g-pro-x-superlight.jpg";
import ankerPowerBankImage from "@/assets/products/anker-power-bank.jpg";
import philipsWakeupImage from "@/assets/products/philips-wakeup-light.jpg";
import theragunImage from "@/assets/products/theragun-prime.jpg";
import withingsScaleImage from "@/assets/products/withings-scale.jpg";
import jblKidsImage from "@/assets/products/jbl-jr310bt-headphones.jpg";
import osmoImage from "@/assets/products/osmo-genius-kit.jpg";
import vtechWatchImage from "@/assets/products/vtech-kidizoom-dx3.jpg";
import fireTabletImage from "@/assets/products/fire-hd-10-kids-pro.jpg";
import rocketbookImage from "@/assets/products/rocketbook-flex-planner.jpg";
import logitechKeyboardImage from "@/assets/products/logitech-mx-keys-combo.jpg";

interface GiftItem {
  name: string;
  image: string;
  price: string;
}

interface BudgetCategory {
  budget: string;
  forHim: GiftItem[];
  forHer: GiftItem[];
  forKids: GiftItem[];
  forCollege: GiftItem[];
}

const giftData: BudgetCategory[] = [
  {
    budget: "Under $50",
    forHim: [
      { name: "Tile Pro Tracker", image: tileImage, price: "$35" },
      { name: "Anker Power Bank", image: ankerPowerBankImage, price: "$40" },
    ],
    forHer: [
      { name: "Tile Pro Tracker", image: tileImage, price: "$35" },
      { name: "Rocketbook Planner", image: rocketbookImage, price: "$37" },
    ],
    forKids: [
      { name: "JBL Jr310BT Headphones", image: jblKidsImage, price: "$40" },
    ],
    forCollege: [
      { name: "Anker Power Bank", image: ankerPowerBankImage, price: "$40" },
      { name: "Rocketbook Planner", image: rocketbookImage, price: "$37" },
    ],
  },
  {
    budget: "Under $100",
    forHim: [
      { name: "Logitech G Pro Mouse", image: logitechMouseImage, price: "$90" },
      { name: "Fitbit Charge 6", image: fitbitImage, price: "$99" },
    ],
    forHer: [
      { name: "Fitbit Charge 6", image: fitbitImage, price: "$99" },
      { name: "Philips Wake-Up Light", image: philipsWakeupImage, price: "$80" },
    ],
    forKids: [
      { name: "VTech Kidizoom DX3", image: vtechWatchImage, price: "$65" },
      { name: "Osmo Genius Kit", image: osmoImage, price: "$99" },
    ],
    forCollege: [
      { name: "Echo Show 8", image: echoShowImage, price: "$85" },
      { name: "Fitbit Charge 6", image: fitbitImage, price: "$99" },
    ],
  },
  {
    budget: "Under $200",
    forHim: [
      { name: "AirPods Pro 2", image: airpodsImage, price: "$189" },
      { name: "Theragun Prime", image: theragunImage, price: "$199" },
    ],
    forHer: [
      { name: "AirPods Pro 2", image: airpodsImage, price: "$189" },
      { name: "Withings Smart Scale", image: withingsScaleImage, price: "$100" },
    ],
    forKids: [
      { name: "Fire HD 10 Kids Pro", image: fireTabletImage, price: "$190" },
    ],
    forCollege: [
      { name: "AirPods Pro 2", image: airpodsImage, price: "$189" },
      { name: "Logitech MX Keys Combo", image: logitechKeyboardImage, price: "$180" },
    ],
  },
  {
    budget: "$200+",
    forHim: [
      { name: "Sony WH-1000XM5", image: sonyHeadphonesImage, price: "$350" },
      { name: "Meta Quest 3", image: metaQuestImage, price: "$500" },
    ],
    forHer: [
      { name: "Sony WH-1000XM5", image: sonyHeadphonesImage, price: "$350" },
      { name: "iPad 10th Gen", image: ipadImage, price: "$349" },
    ],
    forKids: [
      { name: "iPad 10th Gen", image: ipadImage, price: "$349" },
      { name: "Meta Quest 3", image: metaQuestImage, price: "$500" },
    ],
    forCollege: [
      { name: "MacBook Air M4", image: macbookImage, price: "$999" },
      { name: "Bose QC45 Headphones", image: boseHeadphonesImage, price: "$329" },
    ],
  },
];

const GiftCard = ({ item }: { item: GiftItem }) => (
  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-border/50">
    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
      <p className="text-xs text-christmas-red font-semibold">{item.price}</p>
    </div>
  </div>
);

const TechGiftCheatsheet = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen vogue-theme bg-background text-foreground">
      <Helmet>
        <title>Tech Gift Cheatsheet 2026 | Modern Tech</title>
        <meta name="description" content="The ultimate printable tech gift cheatsheet — top picks for him, her, kids, college students and more at every budget." />
        <meta property="og:title" content="Tech Gift Cheatsheet 2026" />
        <meta property="og:description" content="Printable tech gift guide with top picks for him, her, kids & college students at every budget." />
        <meta property="og:image" content="https://moderntech.store/images/products/airpods-pro-2.jpg" />
        <meta property="og:url" content="https://moderntech.store/tech-gift-cheatsheet" />
        <meta property="og:type" content="article" />
      </Helmet>
      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border p-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">Tech Gift Cheatsheet Preview</h1>
          <Button onClick={handlePrint} variant="cta" className="gap-2">
            <Printer className="h-4 w-4" />
            Print / Save as PDF
          </Button>
        </div>
      </div>

      {/* Printable Content */}
      <div className="max-w-5xl mx-auto p-6 print:p-4 print:max-w-none">
        {/* Page 1 */}
        <div className="bg-white rounded-xl shadow-lg print:shadow-none print:rounded-none mb-8 print:mb-0 print:break-after-page">
          <div className="p-8 print:p-6">
            {/* Header */}
            <div className="text-center mb-8 print:mb-6">
              <div className="inline-block bg-gradient-to-r from-christmas-red to-christmas-green text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
                🎁 Modern Tech LLC
              </div>
              <h1 className="text-3xl print:text-2xl font-bold text-foreground mb-2">
                The Ultimate 2025 Tech Gift Cheatsheet
              </h1>
              <p className="text-muted-foreground">
                Find the perfect tech gift for everyone on your list
              </p>
            </div>

            {/* Budget Categories - First Half */}
            <div className="space-y-6 print:space-y-4">
              {giftData.slice(0, 2).map((category) => (
                <div key={category.budget} className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-christmas-red text-white px-4 py-2 font-bold text-center">
                    {category.budget}
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4 print:gap-2 print:p-3">
                    <div>
                      <h3 className="text-sm font-semibold text-christmas-green mb-2 text-center">👨 For Him</h3>
                      <div className="space-y-2">
                        {category.forHim.map((item, idx) => (
                          <GiftCard key={idx} item={item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-christmas-red mb-2 text-center">👩 For Her</h3>
                      <div className="space-y-2">
                        {category.forHer.map((item, idx) => (
                          <GiftCard key={idx} item={item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-christmas-green mb-2 text-center">👶 For Kids</h3>
                      <div className="space-y-2">
                        {category.forKids.map((item, idx) => (
                          <GiftCard key={idx} item={item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-christmas-red mb-2 text-center">🎓 College</h3>
                      <div className="space-y-2">
                        {category.forCollege.map((item, idx) => (
                          <GiftCard key={idx} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Page 2 */}
        <div className="bg-white rounded-xl shadow-lg print:shadow-none print:rounded-none">
          <div className="p-8 print:p-6">
            {/* Page 2 Header */}
            <div className="text-center mb-6 print:mb-4">
              <h2 className="text-2xl print:text-xl font-bold text-foreground">
                Premium Gift Ideas 💎
              </h2>
            </div>

            {/* Budget Categories - Second Half */}
            <div className="space-y-6 print:space-y-4">
              {giftData.slice(2).map((category) => (
                <div key={category.budget} className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-christmas-green text-white px-4 py-2 font-bold text-center">
                    {category.budget}
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4 print:gap-2 print:p-3">
                    <div>
                      <h3 className="text-sm font-semibold text-christmas-green mb-2 text-center">👨 For Him</h3>
                      <div className="space-y-2">
                        {category.forHim.map((item, idx) => (
                          <GiftCard key={idx} item={item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-christmas-red mb-2 text-center">👩 For Her</h3>
                      <div className="space-y-2">
                        {category.forHer.map((item, idx) => (
                          <GiftCard key={idx} item={item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-christmas-green mb-2 text-center">👶 For Kids</h3>
                      <div className="space-y-2">
                        {category.forKids.map((item, idx) => (
                          <GiftCard key={idx} item={item} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-christmas-red mb-2 text-center">🎓 College</h3>
                      <div className="space-y-2">
                        {category.forCollege.map((item, idx) => (
                          <GiftCard key={idx} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 print:mt-6 text-center border-t border-border pt-6 print:pt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Visit us for more gift ideas and reviews
              </p>
              <p className="text-lg font-bold text-christmas-red">
                moderntechllc.com
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                As an Amazon Associate, I earn from qualifying purchases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
      <div className="print:hidden">
        <AffiliateFooter />
      </div>
    </div>
  );
};

export default TechGiftCheatsheet;
