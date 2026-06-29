import React from 'react';
import { asinToSlug, amznToSlug } from '@/data/blogPostsData';

export const rewriteAmazonLinks = (html: string): string => {
  // Replace amazon.com/dp/ASIN links
  let result = html.replace(
    /https?:\/\/(?:www\.)?amazon\.com\/dp\/([A-Z0-9]+)[^"']*/g,
    (_match, asin) => {
      const slug = asinToSlug[asin];
      return slug ? `/go/${slug}` : _match;
    }
  );
  // Replace amzn.to short links
  result = result.replace(
    /https?:\/\/amzn\.to\/([A-Za-z0-9]+)/g,
    (_match, code) => {
      const slug = amznToSlug[code];
      return slug ? `/go/${slug}` : _match;
    }
  );
  return result;
};

export const parseMarkdownBold = (text: string): React.ReactNode[] => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 0 ? part : <strong key={i} className="text-foreground font-bold">{part}</strong>
  );
};
