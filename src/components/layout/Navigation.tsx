'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { getCartCount } from '@/lib/store/cart';

export function Navigation() {
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Update cart count
    setCartCount(getCartCount());

    // Subscribe to cart updates
    const { subscribeToCart } = require('@/lib/store/cart');
    const unsubscribe = subscribeToCart(() => {
      setCartCount(getCartCount());
    });

    return unsubscribe;
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/' },
    { label: 'Categories', href: '#categories' },
    { label: 'Products', href: '#products' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#2E5BFF]">Logo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#1F2937] hover:text-[#2E5BFF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search, Cart, Account */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#2E5BFF] focus:ring-2 focus:ring-[#2E5BFF]/10 w-64"
                />
              </div>
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <ShoppingCart size={22} className="text-[#1F2937]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2E5BFF] text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <button className="hidden sm:flex p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <User size={22} className="text-[#1F2937]" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#2E5BFF] focus:ring-2 focus:ring-[#2E5BFF]/10 w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-base font-medium text-[#1F2937] hover:text-[#2E5BFF] hover:bg-gray-50 px-3 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
