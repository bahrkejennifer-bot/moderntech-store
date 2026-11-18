import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { november18CollectionProducts } from "@/lib/november18Edition";

export default function November18CollectionPicks({ path }: { path: string }) {
  const products = november18CollectionProducts(path);
  if (!products.length) return null;
  return (
    <section aria-label="November 18 Weekly Edit picks" className="max-w-6xl mx-auto px-8 pb-12">
      <h2 className="font-serif italic text-2xl mb-6">From the November 18 Weekly Edit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-border">
        {products.map(product => (
          <div key={product.asin} data-edition-product={product.asin} className="min-w-0 border-r border-b border-border p-6">
            <img src={product.imageUrl} alt={product.name} loading="lazy" className="aspect-square w-full object-contain bg-card" />
            <h3 className="font-serif text-xl mt-4">{product.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.reason}</p>
            <Button asChild variant="link" className="px-0 mt-4"><a href={product.affiliateUrl} target="_blank" rel="sponsored noopener">See it on Amazon <ExternalLink aria-hidden="true" /></a></Button>
          </div>
        ))}
      </div>
    </section>
  );
}
