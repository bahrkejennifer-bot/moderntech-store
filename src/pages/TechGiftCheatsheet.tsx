import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
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
import rocketbookImage from "@/assets/products/rocketbook-flex-planner.jpg";
import logitechKeyboardImage from "@/assets/products/logitech-mx-keys-combo.jpg";

const AFFILIATE_TAG = "moderntechs04-20";
const amazonLink = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;

interface GiftItem {
  name: string;
  image: string;
  asin: string;
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
    budget: "Budget-Friendly Picks",
    forHim: [
      { name: "Tile Pro Tracker", image: tileImage, asin: "B0D636MDW7" },
      { name: "Anker 335 Power Bank", image: ankerPowerBankImage, asin: "B09SFS9J2K" },
    ],
    forHer: [
      { name: "Tile Pro Tracker", image: tileImage, asin: "B0D636MDW7" },
      { name: "Rocketbook Pro Planner Page Pack", image: rocketbookImage, asin: "B0B48K5SF8" },
    ],
    forKids: [
      { name: "JBL JR310BT Kids Headphones", image: jblKidsImage, asin: "B08T6H648Z" },
    ],
    forCollege: [
      { name: "Anker 335 Power Bank", image: ankerPowerBankImage, asin: "B09SFS9J2K" },
      { name: "Rocketbook Pro Planner Page Pack", image: rocketbookImage, asin: "B0B48K5SF8" },
    ],
  },
  {
    budget: "Mid-Range Picks",
    forHim: [
      { name: "Logitech G PRO X Superlight 2", image: logitechMouseImage, asin: "B09NBWL8J5" },
      { name: "Fitbit Charge 6", image: fitbitImage, asin: "B0CC62ZG1M" },
    ],
    forHer: [
      { name: "Fitbit Charge 6", image: fitbitImage, asin: "B0CC62ZG1M" },
      { name: "Philips SmartSleep Wake-Up Light", image: philipsWakeupImage, asin: "B0093162RM" },
    ],
    forKids: [
      { name: "VTech KidiZoom Smartwatch DX4", image: vtechWatchImage, asin: "B0CSCZC4GK" },
      { name: "Osmo Genius Starter Kit", image: osmoImage, asin: "B07NHS4D4T" },
    ],
    forCollege: [
      { name: "Echo Show 11", image: echoShowImage, asin: "B0DC91H3JK" },
      { name: "Fitbit Charge 6", image: fitbitImage, asin: "B0CC62ZG1M" },
    ],
  },
  {
    budget: "Premium Picks",
    forHim: [
      { name: "AirPods Pro 2", image: airpodsImage, asin: "B0CHWRXH8B" },
      { name: "Theragun Prime 6th Gen", image: theragunImage, asin: "B0FKCJNHWB" },
    ],
    forHer: [
      { name: "AirPods Pro 2", image: airpodsImage, asin: "B0CHWRXH8B" },
      { name: "Withings Body Smart Scale", image: withingsScaleImage, asin: "B0C3JNJPZ7" },
    ],
    forKids: [
      { name: "Osmo Genius Starter Kit", image: osmoImage, asin: "B07NHS4D4T" },
      { name: "JBL JR310BT Kids Headphones", image: jblKidsImage, asin: "B08T6H648Z" },
    ],
    forCollege: [
      { name: "AirPods Pro 2", image: airpodsImage, asin: "B0CHWRXH8B" },
      { name: "Logitech MX Keys S Combo", image: logitechKeyboardImage, asin: "B0BKVY4WKT" },
    ],
  },
  {
    budget: "Splurge Picks",
    forHim: [
      { name: "Sony WH-1000XM5", image: sonyHeadphonesImage, asin: "B09XS7JWHH" },
      { name: "Meta Quest 3 512GB", image: metaQuestImage, asin: "B0CD1JTBSC" },
    ],
    forHer: [
      { name: "Sony WH-1000XM5", image: sonyHeadphonesImage, asin: "B09XS7JWHH" },
      { name: "iPad 10th Gen", image: ipadImage, asin: "B0BJLXMVMV" },
    ],
    forKids: [
      { name: "iPad 10th Gen", image: ipadImage, asin: "B0BJLXMVMV" },
      { name: "Meta Quest 3 512GB", image: metaQuestImage, asin: "B0CD1JTBSC" },
    ],
    forCollege: [
      { name: "MacBook Air 13-inch M4", image: macbookImage, asin: "B0DZDCLHF2" },
      { name: "Bose QuietComfort 45", image: boseHeadphonesImage, asin: "B098FKXT8L" },
    ],
  },
];

const GiftCard = ({ item }: { item: GiftItem }) => (
  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-border/50">
    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
      <a
        href={amazonLink(item.asin)}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="text-xs text-christmas-red font-semibold underline underline-offset-2"
      >
        Check today's price on Amazon
      </a>
    </div>
  </div>
);

const AudienceColumn = ({ title, colorClass, items }: { title: string; colorClass: string; items: GiftItem[] }) => (
  <div>
    <h3 className={`text-sm font-semibold ${colorClass} mb-2 text-center`}>{title}</h3>
    <div className="space-y-2">
      {items.map((item, idx) => (
        <GiftCard key={idx} item={item} />
      ))}
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
        <title>The Ultimate 2026 Tech Gift Cheatsheet | Modern Tech</title>
        <meta name="description" content="The ultimate printable 2026 tech gift cheatsheet - top picks for him, her, kids, college students and more at every budget." />
        <meta property="og:title" content="The Ultimate 2026 Tech Gift Cheatsheet" />
        <meta property="og:description" content="Printable 2026 tech gift guide with top picks for him, her, kids & college students at every budget." />
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
                The Ultimate 2026 Tech Gift Cheatsheet
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
                    <AudienceColumn title="👨 For Him" colorClass="text-christmas-green" items={category.forHim} />
                    <AudienceColumn title="👩 For Her" colorClass="text-christmas-red" items={category.forHer} />
                    <AudienceColumn title="👶 For Kids" colorClass="text-christmas-green" items={category.forKids} />
                    <AudienceColumn title="🎓 College" colorClass="text-christmas-red" items={category.forCollege} />
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
                    <AudienceColumn title="👨 For Him" colorClass="text-christmas-green" items={category.forHim} />
                    <AudienceColumn title="👩 For Her" colorClass="text-christmas-red" items={category.forHer} />
                    <AudienceColumn title="👶 For Kids" colorClass="text-christmas-green" items={category.forKids} />
                    <AudienceColumn title="🎓 College" colorClass="text-christmas-red" items={category.forCollege} />
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
                moderntech.store
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                As an Amazon Associate, I earn from qualifying purchases.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                © 2026 Modern Tech LLC
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
