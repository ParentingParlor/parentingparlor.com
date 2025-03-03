'use client';

import { Ban as Bar, Clock, Star, Award, TrendingUp, Zap } from 'lucide-react';
import { UserPoints } from '@/types';

interface PointsOverviewProps {
  points: UserPoints;
}

export default function PointsOverview({ points }: PointsOverviewProps) {
  const formatMonth = (monthStr: string) => {
    const [year, month] = monthStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Get recent activities (last 5)
  const recentActivities = points.activities.slice(0, 5);

  // Get top months
  const topMonths = [...points.history]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  // Get total rewards
  const totalRewards = points.rewards.reduce((sum, reward) => sum + reward.amount, 0);

  return (
    <div className="space-y-6">
      {/* Points Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Total Points</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(points.total)}</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: {formatDate(points.lastUpdated)}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">This Month</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatNumber(points.thisMonth)}</p>
          {points.rank && (
            <p className="text-sm text-gray-500 mt-2">
              You're in the top {100 - Math.floor(points.rank.percentile)}% of users
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Rewards Earned</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalRewards)}</p>
          <p className="text-sm text-gray-500 mt-2">From {points.rewards.length} distributions</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Activities</h3>
        </div>

        {recentActivities.length > 0 ? (
          <div className="space-y-3">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start justify-between border-b pb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">{formatDate(activity.timestamp)}</span>
                  </div>
                  <p className="text-gray-900 mt-1">{activity.description}</p>
                </div>
                <div className="flex items-center text-green-600 font-medium">
                  +{activity.points} pts
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No activities recorded yet.</p>
        )}
      </div>

      {/* Monthly Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Top Performing Months</h3>
          </div>

          {topMonths.length > 0 ? (
            <div className="space-y-4">
              {topMonths.map(month => (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{formatMonth(month.month)}</span>
                    <span className="text-purple-600 font-medium">{formatNumber(month.points)} pts</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2 w-full">
                    <div 
                      className="bg-purple-600 rounded-full h-2" 
                      style={{ 
                        width: `${Math.min(100, (month.points / (topMonths[0].points * 1.2)) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No monthly data available yet.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Recent Rewards</h3>
          </div>

          {points.rewards.length > 0 ? (
            <div className="space-y-3">
              {points.rewards.slice(0, 3).map(reward => (
                <div key={reward.id} className="flex items-start justify-between border-b pb-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      {reward.type === 'top_performer' ? 'Top Performer' : 'Lucky Draw'} - {formatMonth(reward.month)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Distributed on {formatDate(reward.distributionDate)}
                    </p>
                  </div>
                  <div className="text-green-600 font-medium">
                    {formatCurrency(reward.amount)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No rewards received yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}