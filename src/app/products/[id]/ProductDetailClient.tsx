'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
  Minus,
  Plus,
  Check,
} from 'lucide-react';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { products } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { Product } from '@/types';

export default function ProductDetailClient({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-primary-600">Products</Link>
          <ChevronRight size={14} />
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-primary-600">
            {product.category}
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${
                  product.badge === 'Sale' ? 'bg-red-500 text-white' :
                  product.badge === 'New' ? 'bg-green-500 text-white' :
                  product.badge === 'Best Seller' ? 'bg-primary-500 text-white' :
                  product.badge === 'Top Rated' ? 'bg-yellow-500 text-white' :
                  'bg-gray-700 text-white'
                }`}>
                  {product.badge}
                </span>
              )}
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-primary-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image src={img} alt={`View ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
                {product.category}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:border-red-300 transition-colors"
                >
                  <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                </button>
                <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:border-gray-300 transition-colors">
                  <Share2 size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} className={star <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviewCount.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Save {discountPercent}%</span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{product.description}</p>

            <div className="flex items-center gap-2 mb-6">
              {product.stock > 0 ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">
                    In Stock{product.stock < 10 && <span className="text-orange-500 ml-1">(Only {product.stock} left!)</span>}
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium text-red-500">Out of Stock</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors">
                  <Minus size={16} className="text-gray-500" />
                </button>
                <span className="px-4 py-2 text-sm font-semibold min-w-[3rem] text-center border-x border-gray-200">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 hover:bg-gray-50 transition-colors">
                  <Plus size={16} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all text-sm ${
                  added ? 'bg-green-500 text-white' :
                  product.stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                  'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {added ? <><Check size={18} /> Added to Cart!</> : <><ShoppingCart size={18} /> Add to Cart</>}
              </button>
              <Link
                href="/checkout"
                className="flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors text-sm"
              >
                Buy Now
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl">
              {[
                { icon: Truck, text: 'Free shipping over $50' },
                { icon: Shield, text: '2-year warranty' },
                { icon: RefreshCw, text: '30-day returns' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex flex-col items-center text-center gap-1">
                    <Icon size={18} className="text-primary-600" />
                    <span className="text-xs text-gray-600 leading-tight">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-16">
          <div className="flex border-b border-gray-200 bg-gray-50">
            {(['description', 'specs', 'reviews'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3.5 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab ? 'bg-white text-primary-600 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'reviews' ? `Reviews (${product.reviewCount})` : tab}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Premium build quality', 'Thoughtfully designed', 'Sustainability focused', 'Backed by warranty'].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'specs' && product.specs && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2.5 px-4 bg-gray-50 rounded-lg text-sm">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-600 text-right ml-4">{value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-900">{product.rating}</p>
                    <div className="flex justify-center mt-1">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={16} className={s <= Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{product.reviewCount.toLocaleString()} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map((stars) => {
                      const pct = stars===5?70:stars===4?20:stars===3?7:stars===2?2:1;
                      return (
                        <div key={stars} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-gray-600">{stars}</span>
                          <Star size={10} className="fill-yellow-400 text-yellow-400" />
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="w-7 text-gray-500">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {[
                  { name: 'John D.', rating: 5, date: '2 weeks ago', comment: 'Absolutely love this product! Exceeded my expectations.' },
                  { name: 'Sarah M.', rating: 4, date: '1 month ago', comment: 'Great quality, fast shipping. Would recommend to friends.' },
                  { name: 'Mike T.', rating: 5, date: '1 month ago', comment: 'Best purchase I have made this year. Worth every penny!' },
                ].map((review) => (
                  <div key={review.name} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-sm font-bold">
                          {review.name[0]}
                        </div>
                        <span className="font-medium text-sm text-gray-900">{review.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <div className="flex mb-1.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={12} className={s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
