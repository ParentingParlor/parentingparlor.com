'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import CommunityLists from '@/components/lists/CommunityLists';

export default function CommunityListsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Community Lists' }
        ]} 
      />

      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Lists</h1>
          <p className="text-gray-600 mt-2">
            Discover and save helpful lists from other parents
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder="Search lists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <CommunityLists searchQuery={searchQuery} />
      </div>
    </div>
  );
}