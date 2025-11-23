'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, ChevronLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProductById, products, getProductReviews } from '@/lib/data/products';
import { addToCart } from '@/lib/store/cart';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const product = getProductById(resolvedParams.id);
  const productReviews = product ? getProductReviews(product.id) : [];
  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/" className="btn-primary">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-6">
          <Link href="/" className="hover:text-[#2E5BFF]">
            Home
          </Link>
          <span>/</span>
          <Link href="/" className="hover:text-[#2E5BFF]">
            Products
          </Link>
          <span>/</span>
          <span className="text-[#1F2937]">{product.name}</span>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
              />
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-[#2E5BFF]' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image src={img} alt={`${product.name} view ${idx + 1}`} fill className="object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.badge && <span className="badge badge-success mb-3">{product.badge}</span>}

            <h1 className="text-3xl font-bold text-[#1E3A8A] mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'star-filled fill-current' : 'star-empty fill-current'}
                  />
                ))}
              </div>
              <span className="text-sm text-[#6B7280]">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-[#1E3A8A]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xl text-[#6B7280] line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-[#6B7280] mb-6 leading-relaxed">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#1F2937] mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50 font-semibold"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 border border-gray-300 rounded-md text-center font-semibold"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-50 font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button onClick={handleAddToCart} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="btn-secondary w-12 h-12 flex items-center justify-center">
                <Heart size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <Truck size={20} className="text-[#2E5BFF]" />
                <span>Free shipping on orders over $99</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <Shield size={20} className="text-[#2E5BFF]" />
                <span>1-year warranty included</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <RotateCcw size={20} className="text-[#2E5BFF]" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            {productReviews.length > 0 ? (
              productReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-600">
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F2937]">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={i < review.rating ? 'star-filled fill-current' : 'star-empty fill-current'}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-[#6B7280]">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#6B7280]">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-[#6B7280]">No reviews yet. Be the first to review this product!</p>
            )}
          </div>
        </section>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold text-[#1E3A8A] mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                {...relatedProduct}
                onAddToCart={() =>
                  addToCart({
                    productId: relatedProduct.id,
                    name: relatedProduct.name,
                    price: relatedProduct.price,
                    image: relatedProduct.image,
                  })
                }
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
