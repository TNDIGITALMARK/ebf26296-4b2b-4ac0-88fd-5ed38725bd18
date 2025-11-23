'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Monitor, Headphones, Home, Sparkles, Star } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/ui/ProductCard';
import { products, categories, reviews } from '@/lib/data/products';
import { addToCart } from '@/lib/store/cart';

export const dynamic = 'force-dynamic';

const iconMap: Record<string, any> = {
  monitor: Monitor,
  headphones: Headphones,
  home: Home,
  sparkles: Sparkles,
};

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured);
  const featuredReviews = reviews.slice(0, 3);

  const handleAddToCart = (product: any) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="bg-[#E8F0FF] py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Hero Text */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 leading-tight">
                  DISCOVER YOUR NEXT
                  <br />
                  FAVORITE THING
                </h1>
                <p className="text-lg text-[#6B7280] mb-6">
                  Shop the latest products with unbeatable prices and quality
                </p>
                <Link href="#products" className="btn-primary inline-block">
                  Shop Now
                </Link>
              </div>

              {/* Hero Image */}
              <div className="relative h-80 lg:h-96">
                <Image
                  src="/generated/hero-desk.png"
                  alt="Featured products"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Free Shipping Banner */}
        <section className="bg-[#10B981] text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-medium">
              ✨ FREE SHIPPING ON ALL ORDERS OVER $99
            </p>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-8">FEATURED PRODUCTS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-12 bg-gray-50" id="categories">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1E3A8A] mb-8">PRODUCT CATEGORIES</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {categories.map((category) => {
                const IconComponent = iconMap[category.icon] || Monitor;
                return (
                  <Link
                    key={category.id}
                    href={`/?category=${category.id}`}
                    className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E8F0FF] flex items-center justify-center mb-3">
                      <IconComponent size={28} className="text-[#2E5BFF]" />
                    </div>
                    <h3 className="font-semibold text-[#1F2937] mb-1">{category.name}</h3>
                    <p className="text-sm text-[#6B7280]">{category.count} items</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* All Products Grid */}
        <section className="py-12" id="products">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#1E3A8A]">PREMIUM REVIEWS</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Products Grid */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  ))}
                </div>
              </div>

              {/* Customer Reviews Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
                  <h3 className="font-bold text-[#1E3A8A] mb-4">CUSTOMER REVIEWS</h3>
                  <div className="space-y-6">
                    {featuredReviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-[#1F2937]">{review.author}</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={i < review.rating ? 'star-filled fill-current' : 'star-empty fill-current'}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[#6B7280] line-clamp-3">{review.comment}</p>
                      </div>
                    ))}
                    <button className="btn-primary w-full text-sm">View All Reviews</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}