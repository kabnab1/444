'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  Store,
} from 'lucide-react';
import { useUIStore } from '@/lib/store';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2, disabled: true },
  { href: '/admin/settings', label: 'Settings', icon: Settings, disabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`bg-gray-900 text-white flex flex-col transition-all duration-300 relative ${
        sidebarOpen ? 'w-64' : 'w-16'
      } flex-shrink-0`}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        {sidebarOpen && (
          <Link href="/admin" className="flex items-center gap-2">
            <div className="bg-primary-600 text-white p-1.5 rounded-lg">
              <Zap size={18} />
            </div>
            <span className="font-bold text-white">
              Shop<span className="text-primary-400">Admin</span>
            </span>
          </Link>
        )}
        {!sidebarOpen && (
          <div className="mx-auto bg-primary-600 text-white p-1.5 rounded-lg">
            <Zap size={18} />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className={`text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg p-1 transition-colors ${
            !sidebarOpen ? 'absolute right-0 translate-x-1/2 top-4 bg-gray-800 border border-gray-600 z-10' : ''
          }`}
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {sidebarOpen && (
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-3">
            Main Menu
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.disabled ? '#' : item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                item.disabled
                  ? 'opacity-40 cursor-not-allowed'
                  : active
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              } ${!sidebarOpen ? 'justify-center' : ''}`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {!sidebarOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <Link
          href="/"
          className={`flex items-center gap-3 text-gray-400 hover:text-white transition-colors ${
            !sidebarOpen ? 'justify-center' : ''
          }`}
          title={!sidebarOpen ? 'Back to Store' : undefined}
        >
          <Store size={18} className="flex-shrink-0" />
          {sidebarOpen && <span className="text-sm">Back to Store</span>}
        </Link>
      </div>
    </aside>
  );
}
