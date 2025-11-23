'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  onAddToCart?: () => void;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  badge,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="product-card group">
      {/* Product Image */}
      <Link href={`/products/${id}`} className="block relative aspect-[4/3] bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {badge && (
          <span className="absolute top-2 left-2 badge badge-success">
            {badge}
          </span>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/products/${id}`}>
          <h3 className="font-semibold text-[#1F2937] mb-1 line-clamp-2 group-hover:text-[#2E5BFF] transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? 'star-filled fill-current' : 'star-empty fill-current'}
              />
            ))}
          </div>
          <span className="text-xs text-secondary ml-1">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-[#111827]">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart?.();
          }}
          className="btn-primary w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
