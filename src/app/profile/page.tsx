'use client';

import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Shield, Baby, List, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Badge from '@/components/Badge';
import { badges } from '@/data/badges';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export default function ProfilePage() {
  const user = useUser();
  const [userBadges] = useState(badges.slice(0, 2)); // Mock some badges

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Profile' }
        ]} 
      />

      <div className="space-y-6">
        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-purple-700 font-semibold text-3xl">
                {user.name[0]}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location.city}, {user.location.state}</span>
              </div>
              <div className="flex gap-2 mt-3">
                {userBadges.map((badge) => (
                  <Badge key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">127</div>
              <div className="text-sm text-gray-500">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1.2k</div>
              <div className="text-sm text-gray-500">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">892</div>
              <div className="text-sm text-gray-500">Helpful Votes</div>
            </div>
          </div>
        </div>

        {/* Lists and Children */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-purple-600" />
                <h2 className="font-semibold text-gray-900">My Lists</h2>
              </div>
              <Link href="/profile/my-lists">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              You have 5 lists, including 2 product lists and 3 custom lists.
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-purple-600" />
                <h2 className="font-semibold text-gray-900">Children</h2>
              </div>
              <Link href="/profile/settings">
                <Button variant="ghost" size="sm">Manage</Button>
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              Add your children's information to get personalized recommendations.
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              <h2 className="font-semibold text-gray-900">Recent Activity</h2>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Your recent activity will appear here.
          </div>
        </div>
      </div>
    </div>
  );
}