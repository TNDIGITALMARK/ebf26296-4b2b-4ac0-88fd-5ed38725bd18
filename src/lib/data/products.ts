// Mock product data for e-commerce store

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  category: string;
  inStock: boolean;
  featured?: boolean;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: 'monitor', count: 124 },
  { id: 'audio', name: 'Audio', icon: 'headphones', count: 89 },
  { id: 'home', name: 'Home & Kitchen', icon: 'home', count: 156 },
  { id: 'beauty', name: 'Beauty', icon: 'sparkles', count: 67 },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life. Crystal clear audio quality with deep bass and comfortable over-ear design. Perfect for music lovers and professionals.',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.5,
    reviewCount: 234,
    image: '/generated/product-headphones.png',
    images: [
      '/generated/product-headphones.png',
      '/generated/product-headphones.png',
      '/generated/product-headphones.png',
    ],
    category: 'audio',
    inStock: true,
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: '2',
    name: 'Premium Coffee Maker',
    description: 'Professional-grade espresso machine with built-in grinder. Make barista-quality coffee at home with precision temperature control and milk frother.',
    price: 89.99,
    rating: 4.8,
    reviewCount: 156,
    image: '/generated/product-coffee-maker.png',
    images: [
      '/generated/product-coffee-maker.png',
      '/generated/product-coffee-maker.png',
      '/generated/product-coffee-maker.png',
    ],
    category: 'home',
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Organic Skincare Set',
    description: 'Complete organic skincare collection with natural ingredients. Includes cleanser, toner, serum, and moisturizer for radiant, healthy skin.',
    price: 45.99,
    rating: 4.2,
    reviewCount: 89,
    image: '/generated/product-skincare.png',
    images: [
      '/generated/product-skincare.png',
      '/generated/product-skincare.png',
      '/generated/product-skincare.png',
    ],
    category: 'beauty',
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    description: 'Portable wireless speaker with 360° sound and deep bass. Waterproof design perfect for outdoor adventures with 20-hour battery life.',
    price: 79.99,
    rating: 4.6,
    reviewCount: 312,
    image: '/generated/product-speaker.png',
    images: [
      '/generated/product-speaker.png',
      '/generated/product-speaker.png',
      '/generated/product-speaker.png',
    ],
    category: 'audio',
    inStock: true,
    featured: true,
    badge: 'New',
  },
  {
    id: '5',
    name: 'Smart Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking. Stay connected with notifications and 7-day battery life.',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 445,
    image: '/generated/product-headphones.png',
    images: ['/generated/product-headphones.png'],
    category: 'electronics',
    inStock: true,
  },
  {
    id: '6',
    name: 'Yoga Mat Set',
    description: 'Non-slip yoga mat with carrying strap and blocks. Eco-friendly material perfect for all types of yoga and exercise.',
    price: 34.99,
    rating: 4.4,
    reviewCount: 178,
    image: '/generated/product-speaker.png',
    images: ['/generated/product-speaker.png'],
    category: 'home',
    inStock: true,
  },
  {
    id: '7',
    name: 'Desk Lamp',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature. USB charging port and touch controls.',
    price: 42.99,
    rating: 4.3,
    reviewCount: 92,
    image: '/generated/product-coffee-maker.png',
    images: ['/generated/product-coffee-maker.png'],
    category: 'home',
    inStock: true,
  },
  {
    id: '8',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking. Comfortable design for all-day use with 18-month battery life.',
    price: 24.99,
    rating: 4.5,
    reviewCount: 267,
    image: '/generated/product-headphones.png',
    images: ['/generated/product-headphones.png'],
    category: 'electronics',
    inStock: true,
  },
];

export const reviews: Review[] = [
  {
    id: '1',
    productId: '1',
    author: 'Sarah Johnson',
    rating: 5,
    comment: 'Amazing sound quality! The noise cancellation works perfectly and they are super comfortable for long listening sessions.',
    date: '2024-03-15',
  },
  {
    id: '2',
    productId: '2',
    author: 'Michael Chen',
    rating: 5,
    comment: 'Best coffee maker I have ever owned. Makes professional quality espresso every time. Worth every penny!',
    date: '2024-03-14',
  },
  {
    id: '3',
    productId: '3',
    author: 'Emma Wilson',
    rating: 4,
    comment: 'Love this skincare set! My skin feels so much healthier. The only downside is the price, but quality is excellent.',
    date: '2024-03-13',
  },
];

// Helper functions
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}

export function filterProductsByPrice(minPrice: number, maxPrice: number): Product[] {
  return products.filter((p) => p.price >= minPrice && p.price <= maxPrice);
}
