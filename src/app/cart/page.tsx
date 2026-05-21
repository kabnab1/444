'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import { useCartStore } from '@/lib/store';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8 text-center max-w-sm">
            Looks like you have not added any items to your cart yet.
            Start shopping to fill it up!
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-8 rounded-xl transition-colors"
          >
            <ShoppingBag size={20} />
            Start Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-500 mt-1">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1.5"
          >
            <Trash2 size={15} /> Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const discountPercent = item.product.originalPrice
                ? Math.round(
                    ((item.product.originalPrice - item.product.price) /
                      item.product.originalPrice) *
                      100
                  )
                : 0;
              return (
                <div
                  key={item.product.id}
                  className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <Link href={`/products/${item.product.id}`}>
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs text-primary-600 font-medium mb-0.5">
                          {item.product.category}
                        </p>
                        <Link href={`/products/${item.product.id}`}>
                          <h3 className="font-semibold text-gray-900 text-sm leading-tight hover:text-primary-600 transition-colors truncate">
                            {item.product.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Price */}
                      <div>
                        <span className="text-base font-bold text-gray-900">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="ml-2 text-sm text-gray-400 line-through">
                            ${item.product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        {discountPercent > 0 && (
                          <span className="ml-1 text-xs text-red-500 font-semibold">
                            -{discountPercent}%
                          </span>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={14} className="text-gray-500" />
                        </button>
                        <span className="px-3 py-1.5 text-sm font-semibold min-w-[2rem] text-center border-x border-gray-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="px-2.5 py-1.5 hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} className="text-gray-500" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-500">
                        {item.quantity > 1
                          ? `${item.quantity} × $${item.product.price.toFixed(2)}`
                          : ''}
                      </span>
                      <span className="text-sm font-bold text-primary-600">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            <Link
              href="/products"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm mt-4"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                    />
                  </div>
                  <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <div className="text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    You qualify for free shipping!
                  </div>
                )}
                {shipping > 0 && (
                  <div className="text-xs text-gray-500 bg-blue-50 px-3 py-2 rounded-lg">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </Link>

              <div className="mt-4 text-center text-xs text-gray-400">
                Secure checkout powered by SSL encryption
              </div>

              <div className="flex justify-center gap-3 mt-3">
                {['Visa', 'MC', 'PayPal', 'Apple Pay'].map((method) => (
                  <span
                    key={method}
                    className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded font-medium"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
