'use client';

import { DollarSign, ShoppingBag, Users, Package, TrendingUp, Clock, CheckCircle, XCircle, Truck } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { adminStats, orders, products, customers, monthlySalesData } from '@/lib/data';
import { useAdminStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending: { label: 'Pending', color: 'text-yellow-700', bg: 'bg-yellow-100', icon: Clock },
  processing: { label: 'Processing', color: 'text-blue-700', bg: 'bg-blue-100', icon: TrendingUp },
  shipped: { label: 'Shipped', color: 'text-indigo-700', bg: 'bg-indigo-100', icon: Truck },
  delivered: { label: 'Delivered', color: 'text-green-700', bg: 'bg-green-100', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'text-red-700', bg: 'bg-red-100', icon: XCircle },
  refunded: { label: 'Refunded', color: 'text-gray-700', bg: 'bg-gray-100', icon: XCircle },
};

export default function AdminDashboard() {
  const adminOrders = useAdminStore((state) => state.orders);
  const recentOrders = adminOrders.slice(0, 5);

  const maxRevenue = Math.max(...monthlySalesData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-0.5">Welcome back! Here is what is happening.</p>
        </div>
        <div className="text-sm text-gray-500 bg-white border border-gray-200 px-4 py-2 rounded-lg">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value={`$${adminStats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          change={adminStats.revenueGrowth}
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Total Orders"
          value={adminStats.totalOrders.toString()}
          change={adminStats.ordersGrowth}
          icon={ShoppingBag}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Total Customers"
          value={adminStats.totalCustomers.toString()}
          change={adminStats.customersGrowth}
          icon={Users}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
        <StatCard
          title="Total Products"
          value={adminStats.totalProducts.toString()}
          change={adminStats.productsGrowth}
          icon={Package}
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Revenue Overview</h2>
              <p className="text-sm text-gray-500">Monthly sales performance</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 font-medium px-2.5 py-1 rounded-full">
              +12.5% this month
            </span>
          </div>
          {/* Bar Chart */}
          <div className="flex items-end gap-3 h-40">
            {monthlySalesData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-semibold text-gray-600">
                  ${(data.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full bg-primary-500 hover:bg-primary-600 rounded-t-md transition-colors cursor-pointer"
                  style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  title={`$${data.revenue.toLocaleString()}`}
                />
                <span className="text-xs text-gray-500">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Order Status</h2>
          <div className="space-y-3">
            {Object.entries(
              adminOrders.reduce((acc, order) => {
                acc[order.status] = (acc[order.status] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([status, count]) => {
              const config = STATUS_CONFIG[status];
              const Icon = config?.icon;
              const pct = Math.round((count / adminOrders.length) * 100);
              return (
                <div key={status}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {Icon && <Icon size={14} className={config?.color} />}
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {config?.label || status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{count}</span>
                      <span className="text-xs text-gray-400">{pct}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${config?.bg?.replace('bg-', 'bg-').replace('-100', '-400')}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <Link
              href="/admin/orders"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => {
                  const config = STATUS_CONFIG[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <span className="font-mono text-xs font-semibold text-gray-600">
                          {order.id}
                        </span>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-xs text-gray-400">{order.customerEmail}</p>
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config?.color} ${config?.bg}`}
                        >
                          {config?.label}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-bold text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Top Products</h2>
            <Link
              href="/admin/products"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {products.slice(0, 5).map((product, idx) => (
              <div key={product.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-400 w-5">#{idx + 1}</span>
                <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.reviewCount} reviews</p>
                </div>
                <span className="text-sm font-bold text-gray-900">${product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Customers */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Recent Customers</h2>
          <Link
            href="/admin/customers"
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View all →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Orders</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Spent</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.slice(0, 5).map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={customer.avatar}
                        alt={customer.name}
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{customer.totalOrders}</td>
                  <td className="px-5 py-3 font-semibold text-gray-900">
                    ${customer.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-500">
                    {new Date(customer.joinedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
