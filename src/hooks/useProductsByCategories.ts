import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "./useProductsByCategory";

export const useProductsByCategories = (categories: string[]) => {
  return useQuery({
    queryKey: ["products", ...categories],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scraped_products")
        .select("*")
        .in("category", categories)
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as unknown as Product[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
