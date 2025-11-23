'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, Lock, CreditCard } from 'lucide-react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import {
  getCart,
  getCartTotal,
  updateCartItemQuantity,
  removeFromCart,
  getShippingOptions,
  processPayment,
  type CartItem,
  type ShippingInfo,
  type PaymentInfo,
} from '@/lib/store/cart';

export const dynamic = 'force-dynamic';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    setCartItems(getCart());

    const { subscribeToCart } = require('@/lib/store/cart');
    const unsubscribe = subscribeToCart(() => {
      setCartItems(getCart());
    });

    return unsubscribe;
  }, []);

  const shippingOptions = getShippingOptions();
  const subtotal = getCartTotal();
  const shippingCost = shippingOptions.find((opt) => opt.id === selectedShipping)?.price || 0;
  const total = subtotal + shippingCost;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const result = await processPayment(shippingInfo, paymentInfo, cartItems, shippingCost);

      if (result.success) {
        setOrderSuccess(true);
        setOrderId(result.orderId || '');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1E3A8A] mb-2">Order Confirmed!</h1>
            <p className="text-lg text-[#6B7280] mb-6">Thank you for your purchase</p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-[#6B7280] mb-1">Order Number</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">{orderId}</p>
            </div>
            <p className="text-[#6B7280] mb-8">
              A confirmation email has been sent to <strong>{shippingInfo.email}</strong>
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Continue Shopping
            </Link>
            <button className="btn-secondary">Track Order</button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-[#1E3A8A] mb-4">Your cart is empty</h1>
          <p className="text-[#6B7280] mb-8">Add some products to get started!</p>
          <Link href="/" className="btn-primary">
            Start Shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-[#1E3A8A] mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-4 bg-white border border-gray-200 rounded-lg p-4">
                  <div className="relative w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1F2937] mb-1">{item.name}</h3>
                    <p className="text-lg font-bold text-[#2E5BFF]">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        <Minus size={14} className="mx-auto" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                      >
                        <Plus size={14} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold text-[#1E3A8A] mb-6">Order Summary</h2>

              {!showCheckout ? (
                <>
                  {/* Shipping Options */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F2937] mb-3">Shipping Method</h3>
                    <div className="space-y-2">
                      {shippingOptions.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-[#2E5BFF] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping"
                              value={option.id}
                              checked={selectedShipping === option.id}
                              onChange={(e) => setSelectedShipping(e.target.value)}
                              className="text-[#2E5BFF]"
                            />
                            <div>
                              <p className="font-medium text-sm text-[#1F2937]">{option.name}</p>
                              <p className="text-xs text-[#6B7280]">{option.days}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-[#1F2937]">${option.price.toFixed(2)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Shipping</span>
                      <span>${shippingCost.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xl font-bold text-[#1E3A8A] mb-6">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <button onClick={() => setShowCheckout(true)} className="btn-primary w-full flex items-center justify-center gap-2">
                    <Lock size={18} />
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <>
                  {/* Checkout Form */}
                  <form onSubmit={handleCheckout} className="space-y-6">
                    {/* Shipping Information */}
                    <div>
                      <h3 className="font-semibold text-[#1F2937] mb-3">Shipping Information</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Full Name"
                          required
                          value={shippingInfo.name}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                          className="w-full"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                          className="w-full"
                        />
                        <input
                          type="text"
                          placeholder="Address"
                          required
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                          className="w-full"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="City"
                            required
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                            className="w-full"
                          />
                          <input
                            type="text"
                            placeholder="State"
                            required
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                            className="w-full"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="ZIP Code"
                          required
                          value={shippingInfo.zip}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                          className="w-full"
                        />
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div>
                      <h3 className="font-semibold text-[#1F2937] mb-3">Payment Information</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Card Number"
                          required
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                          className="w-full"
                        />
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          required
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                          className="w-full"
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            required
                            value={paymentInfo.expiryDate}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                            className="w-full"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            required
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-xl font-bold text-[#1E3A8A] mb-4">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="space-y-3">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        <CreditCard size={18} />
                        {isProcessing ? 'Processing...' : 'Complete Purchase'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="btn-secondary w-full"
                      >
                        Back to Cart
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
