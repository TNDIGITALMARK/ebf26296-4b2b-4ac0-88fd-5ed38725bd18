// Shopping cart state management with mock functions

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

// Mock cart storage (in real app, would use Context API, Redux, or Zustand)
let cart: CartItem[] = [];
let cartUpdateCallbacks: Array<() => void> = [];

// Subscribe to cart updates
export function subscribeToCart(callback: () => void) {
  cartUpdateCallbacks.push(callback);
  return () => {
    cartUpdateCallbacks = cartUpdateCallbacks.filter((cb) => cb !== callback);
  };
}

function notifyCartUpdate() {
  cartUpdateCallbacks.forEach((callback) => callback());
}

// Cart operations
export function getCart(): CartItem[] {
  return [...cart];
}

export function getCartCount(): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(): number {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function addToCart(item: Omit<CartItem, 'quantity'> & { quantity?: number }) {
  const existingItem = cart.find((i) => i.productId === item.productId);

  if (existingItem) {
    existingItem.quantity += item.quantity || 1;
  } else {
    cart.push({
      ...item,
      quantity: item.quantity || 1,
    });
  }

  notifyCartUpdate();
  return { success: true, message: 'Added to cart!' };
}

export function updateCartItemQuantity(productId: string, quantity: number) {
  const item = cart.find((i) => i.productId === productId);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      notifyCartUpdate();
    }
  }

  return { success: true };
}

export function removeFromCart(productId: string) {
  cart = cart.filter((item) => item.productId !== productId);
  notifyCartUpdate();
  return { success: true, message: 'Removed from cart' };
}

export function clearCart() {
  cart = [];
  notifyCartUpdate();
}

// Mock shipping calculation
export function calculateShipping(location: string, speed: 'standard' | 'express' | 'overnight'): number {
  const shippingRates = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
  };

  return shippingRates[speed];
}

export function getShippingOptions() {
  return [
    { id: 'standard', name: 'Standard Shipping', days: '5-7 business days', price: 5.99 },
    { id: 'express', name: 'Express Shipping', days: '2-3 business days', price: 12.99 },
    { id: 'overnight', name: 'Overnight Shipping', days: '1 business day', price: 24.99 },
  ];
}

// Mock payment processing
export async function processPayment(
  shippingInfo: ShippingInfo,
  paymentInfo: PaymentInfo,
  items: CartItem[],
  shippingCost: number
): Promise<{ success: boolean; orderId?: string; message: string }> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock validation
  if (paymentInfo.cardNumber.length < 16) {
    return { success: false, message: 'Invalid card number' };
  }

  // Generate mock order ID
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(7).toUpperCase()}`;

  // Clear cart after successful payment
  clearCart();

  return {
    success: true,
    orderId,
    message: 'Payment processed successfully!',
  };
}

// Mock order tracking
export interface OrderStatus {
  status: 'processing' | 'shipped' | 'in_transit' | 'delivered';
  location: string;
  date: string;
  message: string;
}

export function getOrderTracking(orderId: string): OrderStatus[] {
  // Mock order status updates
  return [
    {
      status: 'processing',
      location: 'Warehouse',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      message: 'Order confirmed and processing',
    },
    {
      status: 'shipped',
      location: 'Distribution Center',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      message: 'Package shipped from warehouse',
    },
    {
      status: 'in_transit',
      location: 'Local Facility',
      date: new Date().toISOString(),
      message: 'Out for delivery',
    },
  ];
}
