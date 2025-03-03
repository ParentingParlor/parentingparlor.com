'use client';

import { useState } from 'react';
import { MessageSquare, Users2, TrendingUp } from 'lucide-react';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('discussions');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('discussions')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'discussions'
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <MessageSquare className="h-5 w-5 mr-2" />
          Active Discussions
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'members'
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Users2 className="h-5 w-5 mr-2" />
          Members
        </button>
        <button
          onClick={() => setActiveTab('trending')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            activeTab === 'trending'
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          Trending
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Discussions</h2>
            {/* Add discussion list component here */}
          </div>
        )}

        {activeTab === 'members' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Community Members</h2>
            {/* Add members grid component here */}
          </div>
        )}

        {activeTab === 'trending' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Trending Topics</h2>
            {/* Add trending topics component here */}
          </div>
        )}
      </div>
    </div>
  );
}