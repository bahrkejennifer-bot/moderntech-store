import { asinOf, verifiedImages } from "@/lib/curatedSelections";
import type { Product } from "@/hooks/useProductsByCategory";

// Stable category ranking keeps every existing product and destination intact.
export const prepareKidsStemProducts = (products: Product[]): Product[] => {
  const rank = (category: string | null) => category === "kids-tech" ? 0 : category === "college" ? 1 : 2;
  return [...products].sort((a, b) => rank(a.category) - rank(b.category)).map((product) => {
    const image = verifiedImages["snap-circuits-jr-sc-100"];
    const imageUrl = image && asinOf(product.affiliate_link) === image.asin ? image.imageUrl : product.image_url;
    const unusable = !imageUrl || /placeholder\.|fls-na\.amazon\.com/i.test(imageUrl);
    return { ...product, image_url: unusable ? null : imageUrl };
  });
};