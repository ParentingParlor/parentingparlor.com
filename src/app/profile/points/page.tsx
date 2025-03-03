'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { usePoints } from '@/context/UserContext';
import PointsOverview from '@/components/profile/PointsOverview';
import { Award } from 'lucide-react';

export default function PointsPage() {
  const { points } = usePoints();

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Profile', href: '/profile' },
          { label: 'Points & Rewards' }
        ]} 
      />

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Points & Rewards</h1>
          <div className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>{points.total.toLocaleString()} Total Points</span>
          </div>
        </div>
        <p className="text-gray-600">
          Earn points by participating in the community and receive a share of ad revenue each month
        </p>
      </div>

      <PointsOverview points={points} />

      <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">How Points Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Earning Points</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center justify-between">
                <span>Daily Login</span>
                <span className="font-medium text-purple-600">5 points</span>
              </li>
              <li className="flex items-center justify-between">
                <span>View a Page</span>
                <span className="font-medium text-purple-600">1 point</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Post a Comment</span>
                <span className="font-medium text-purple-600">10 points</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Reply to a Comment</span>
                <span className="font-medium text-purple-600">5 points</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Create a Topic</span>
                <span className="font-medium text-purple-600">50 points</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Receive a Like</span>
                <span className="font-medium text-purple-600">2 points</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Send an Invite</span>
                <span className="font-medium text-purple-600">5 points</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Friend Joins</span>
                <span className="font-medium text-purple-600">100 points</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Monthly Rewards</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Each month, 50% of our ad revenue is distributed among our community members based on activity and engagement.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Top 10% of Users</span>
                  <span className="font-medium text-purple-600">Share 25% of revenue</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Random 10% of Users</span>
                  <span className="font-medium text-purple-600">Share 25% of revenue</span>
                </div>
              </div>
              
              <p className="text-sm">
                Points are calculated on a monthly basis, and rewards are distributed on the 5th of the following month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}