'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Users,
  UserCheck,
  UserX,
  DollarSign,
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  X,
  ChevronDown,
} from 'lucide-react';
import { customers } from '@/lib/data';
import { Customer } from '@/types';

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'spent' | 'orders' | 'joined'>('name');

  const filtered = customers
    .filter((c) => {
      const matchSearch =
        !searchQuery ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'spent':
          return b.totalSpent - a.totalSpent;
        case 'orders':
          return b.totalOrders - a.totalOrders;
        case 'joined':
          return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const activeCount = customers.filter((c) => c.status === 'active').length;
  const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 text-sm mt-0.5">{customers.length} total customers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Customers',
            value: customers.length.toString(),
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
          },
          {
            title: 'Active Customers',
            value: activeCount.toString(),
            icon: UserCheck,
            color: 'text-green-600',
            bg: 'bg-green-50',
          },
          {
            title: 'Inactive Customers',
            value: (customers.length - activeCount).toString(),
            icon: UserX,
            color: 'text-red-600',
            bg: 'bg-red-50',
          },
          {
            title: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
            icon: DollarSign,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-medium">{card.title}</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">{card.value}</p>
                </div>
                <div className={`${card.bg} ${card.color} p-2.5 rounded-xl`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col sm:flex-row gap-3 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2.5 text-sm rounded-lg font-medium transition-colors capitalize whitespace-nowrap ${
                statusFilter === status
                  ? status === 'active'
                    ? 'bg-green-600 text-white'
                    : status === 'inactive'
                    ? 'bg-red-500 text-white'
                    : 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none pl-3 pr-8 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none text-gray-700 font-medium cursor-pointer bg-white"
            >
              <option value="name">Sort: Name</option>
              <option value="spent">Sort: Spent</option>
              <option value="orders">Sort: Orders</option>
              <option value="joined">Sort: Newest</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Orders</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Total Spent</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase">Joined</th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex-shrink-0">
                        <Image
                          src={customer.avatar}
                          alt={customer.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                            customer.status === 'active' ? 'bg-green-400' : 'bg-gray-300'
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-400">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700">{customer.email}</p>
                    <p className="text-xs text-gray-400">{customer.phone}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag size={14} className="text-gray-400" />
                      <span className="font-semibold text-gray-900">{customer.totalOrders}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Last: {new Date(customer.lastOrderAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <DollarSign size={14} className="text-gray-400" />
                      <span className="font-bold text-gray-900">
                        {customer.totalSpent.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        customer.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          customer.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">
                    {new Date(customer.joinedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="text-xs font-medium text-primary-600 hover:text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-colors float-right"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400">
                    <Users size={32} className="mx-auto mb-2 opacity-50" />
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Customer Profile</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-5 space-y-5">
              {/* Avatar and Name */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  <Image
                    src={selectedCustomer.avatar}
                    alt={selectedCustomer.name}
                    width={72}
                    height={72}
                    className="rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div
                    className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                      selectedCustomer.status === 'active' ? 'bg-green-400' : 'bg-gray-300'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h3>
                <span
                  className={`mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${
                    selectedCustomer.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {selectedCustomer.status}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Total Orders', value: selectedCustomer.totalOrders, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { label: 'Total Spent', value: `$${selectedCustomer.totalSpent.toFixed(2)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className={`${stat.bg} rounded-xl p-4 text-center`}>
                      <Icon size={20} className={`${stat.color} mx-auto mb-1`} />
                      <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Contact Info */}
              <div className="space-y-2.5">
                <p className="text-xs font-semibold text-gray-500 uppercase">Contact Info</p>
                <div className="flex items-center gap-2.5 text-sm text-gray-700">
                  <Mail size={15} className="text-gray-400 flex-shrink-0" />
                  {selectedCustomer.email}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-700">
                  <Phone size={15} className="text-gray-400 flex-shrink-0" />
                  {selectedCustomer.phone}
                </div>
                <div className="flex items-start gap-2.5 text-sm text-gray-700">
                  <MapPin size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p>{selectedCustomer.address.street}</p>
                    <p>
                      {selectedCustomer.address.city}, {selectedCustomer.address.state}{' '}
                      {selectedCustomer.address.zipCode}
                    </p>
                    <p>{selectedCustomer.address.country}</p>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-500">Member Since</span>
                  <span className="font-medium">
                    {new Date(selectedCustomer.joinedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Order</span>
                  <span className="font-medium">
                    {new Date(selectedCustomer.lastOrderAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
