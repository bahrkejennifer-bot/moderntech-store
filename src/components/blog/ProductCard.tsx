import React from 'react';
import { ExternalLink } from "lucide-react";
import { BlogProduct } from '@/data/blogPostsData';

const ProductCard = ({ product }: { product: BlogProduct }) => (
  <a
    href={product.affiliateLink}
    target="_blank"
    rel="noopener noreferrer nofollow"
    className="group block"
  >
    <div className="rounded-xl border border-border bg-card overflow-hidden h-full flex flex-col shadow-soft hover:shadow-elegant transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold line-clamp-2 mb-1 group-hover:text-foreground/70 transition-colors text-foreground">{product.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">{product.description}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-amber-500">★</span>
            <span className="font-medium text-foreground/70">{product.rating}/5</span>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground border-b border-foreground/20 pb-0.5 group-hover:border-foreground/50 transition-all">
            Shop <ExternalLink className="h-3 w-3" />
          </span>
        </div>
      </div>
    </div>
  </a>
);

export default ProductCard;
