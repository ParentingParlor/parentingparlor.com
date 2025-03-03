'use client';

import { BarChart, DollarSign, Users, ShoppingBag } from 'lucide-react';

interface ProductStatsProps {
  stats: {
    totalContributors: number;
    totalProducts: number;
    averagePrice: number;
    topCategories: { name: string; count: number }[];
    priceRanges: { range: string; count: number }[];
  };
}

export default function ProductStats({ stats }: ProductStatsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Community Stats</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {stats.totalContributors}
            </div>
            <div className="text-sm text-gray-500">Contributors</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <ShoppingBag className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              {stats.totalProducts}
            </div>
            <div className="text-sm text-gray-500">Products</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-gray-900">
              ${stats.averagePrice.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">Average Price</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Top Categories</h3>
          <div className="space-y-3">
            {stats.topCategories.map((category) => (
              <div key={category.name} className="flex items-center">
                <div className="flex-1 pr-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{category.name}</span>
                    <span className="text-sm text-gray-900">{category.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(category.count / Math.max(...stats.topCategories.map(c => c.count))) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-4">Price Distribution</h3>
          <div className="space-y-3">
            {stats.priceRanges.map((range) => (
              <div key={range.range} className="flex items-center">
                <div className="flex-1 pr-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{range.range}</span>
                    <span className="text-sm text-gray-900">{range.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(range.count / Math.max(...stats.priceRanges.map(r => r.count))) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}