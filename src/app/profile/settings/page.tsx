'use client';

import Breadcrumb from '@/components/Breadcrumb';
import { useState } from 'react';
import { User, Shield, Bell, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Badge from '@/components/Badge';
import ChildInfo from '@/components/ChildInfo';
import { Child, UserProfile } from '@/types';
import { badges } from '@/data/badges';

export default function SettingsPage() {
  const [profile, setProfile] = useState<UserProfile>({
    displayName: '',
    isHumanVerified: false,
    badges: [],
    children: [],
    joinDate: new Date().toISOString()
  });

  const handleVerifyHuman = () => {
    setProfile(prev => ({
      ...prev,
      isHumanVerified: true,
      badges: [...prev.badges, badges.find(b => b.id === 'verified-human')!]
    }));
  };

  const updateChildren = (newChildren: Child[]) => {
    setProfile(prev => ({ ...prev, children: newChildren }));
  };

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Profile', href: '/profile' },
          { label: 'Settings' }
        ]} 
      />

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <User className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold ml-3">Profile Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={profile.displayName}
                onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter your display name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                placeholder="your@email.com"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Badges
              </label>
              <div className="flex flex-wrap gap-2">
                {profile.badges.map((badge) => (
                  <Badge key={badge.id} badge={badge} />
                ))}
                {profile.badges.length === 0 && (
                  <p className="text-sm text-gray-500">No badges earned yet</p>
                )}
              </div>
            </div>

            <Button>Save Changes</Button>
          </div>
        </div>

        {/* Child Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <Baby className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold ml-3">Child Information</h2>
          </div>
          
          <ChildInfo
            children={profile.children}
            onUpdate={updateChildren}
          />
        </div>

        {/* Verification */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold ml-3">Verification</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Human Verification</h3>
                <p className="text-sm text-gray-500">
                  Verify your account to get the "Verified Human" badge
                </p>
              </div>
              <Button
                onClick={handleVerifyHuman}
                disabled={profile.isHumanVerified}
              >
                {profile.isHumanVerified ? 'Verified ✓' : 'Verify Now'}
              </Button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold ml-3">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Email Notifications</h3>
                <p className="text-sm text-gray-500">
                  Receive updates about your topics and responses
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}