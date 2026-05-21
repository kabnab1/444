import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import Navbar from '@/components/shop/Navbar';
import Footer from '@/components/shop/Footer';
import ProductCard from '@/components/shop/ProductCard';
import { products, categories } from '@/lib/data';

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured);
  const newArrivals = products.filter((p) => p.badge === 'New' || p.badge === 'Best Seller');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-300 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary-600/50 border border-primary-500 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span>Trusted by 50,000+ customers</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Discover Your
                <span className="block text-primary-300">Perfect Products</span>
              </h1>
              <p className="text-lg text-primary-100 mb-8 max-w-lg leading-relaxed">
                Shop the latest electronics, fashion, home essentials, and sports gear.
                Premium quality at prices you will love, delivered right to your door.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
                >
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/products?featured=true"
                  className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-semibold py-3 px-8 rounded-full transition-all"
                >
                  View Featured
                </Link>
              </div>
              <div className="flex gap-8 mt-10 pt-8 border-t border-primary-600/50">
                {[
                  { value: '12K+', label: 'Products' },
                  { value: '50K+', label: 'Customers' },
                  { value: '4.9', label: 'Rating' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-primary-200">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-96 h-96">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl rotate-3">
                  <Image
                    src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop"
                    alt="Featured product"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-52 h-52 rounded-2xl overflow-hidden shadow-2xl -rotate-3">
                  <Image
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
                    alt="Featured product"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
                    alt="Featured product"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: '100% protected' },
              { icon: Star, title: 'Top Quality', desc: 'Curated products' },
            ].map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-sm"
                >
                  <div className="bg-primary-50 text-primary-600 p-2 rounded-lg flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{badge.title}</p>
                    <p className="text-xs text-gray-500">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-1">Find exactly what you are looking for</p>
          </div>
          <Link
            href="/products"
            className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 text-sm"
          >
            All categories <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-2xl mb-1">{cat.icon}</div>
                <h3 className="text-white font-bold text-lg leading-tight">{cat.name}</h3>
                <p className="text-white/80 text-sm">{cat.productCount} products</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-500 mt-1">Handpicked favorites just for you</p>
            </div>
            <Link
              href="/products?featured=true"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 text-sm"
            >
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-r from-primary-700 to-primary-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
            <div className="w-full h-full bg-white rounded-full scale-150 translate-x-1/2"></div>
          </div>
          <div className="relative max-w-2xl">
            <span className="inline-block bg-white/20 border border-white/30 rounded-full px-3 py-1 text-sm font-medium mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Get 20% Off Your First Order
            </h2>
            <p className="text-primary-100 mb-6 text-lg">
              Use code <span className="font-bold bg-white/20 px-2 py-0.5 rounded">WELCOME20</span> at checkout
              to save on your first purchase.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 font-bold py-3 px-8 rounded-full transition-all shadow-lg"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">New & Popular</h2>
              <p className="text-gray-500 mt-1">Latest additions and bestsellers</p>
            </div>
            <Link
              href="/products"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-1 text-sm"
            >
              See all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">What Our Customers Say</h2>
          <p className="text-gray-500">Join thousands of satisfied shoppers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Sarah M.',
              rating: 5,
              comment:
                'Amazing quality and super fast shipping! The laptop I bought exceeded my expectations. Will definitely order again.',
              product: 'ProBook Laptop',
              avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3fd?w=50&h=50&fit=crop&crop=face',
            },
            {
              name: 'James K.',
              rating: 5,
              comment:
                'Great customer service and the products are exactly as described. The headphones sound incredible!',
              product: 'SoundMax Headphones',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
            },
            {
              name: 'Lisa R.',
              rating: 5,
              comment:
                'Best online shopping experience I have had. The yoga mat is fantastic, and returns process was seamless.',
              product: 'Pro Yoga Mat',
              avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
            },
          ].map((testimonial) => (
            <div key={testimonial.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                &ldquo;{testimonial.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">Purchased: {testimonial.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
