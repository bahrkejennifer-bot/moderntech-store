import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  rating: number | null;
  badge: string | null;
  image_url: string | null;
  affiliate_link: string;
  category: string | null;
  display_order: number;
}

export const useProductsByCategory = (category: string) => {
  return useQuery({
    queryKey: ["products", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scraped_products")
        .select("*")
        .eq("category", category)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as unknown as Product[];
    },
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
};
