'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, Check } from 'lucide-react';
import FilteredTopics from '@/components/FilteredTopics';

// ... rest of the imports

export default function DevelopmentMilestonesPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Development', href: '/development' },
          { label: 'Development Milestones' }
        ]} 
      />

      <div className="space-y-8">
        {/* Existing milestones content */}
        {milestoneCategories.map((category) => (
          <div key={category.title} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* ... existing category card content ... */}
          </div>
        ))}

        {/* Add filtered topics */}
        <FilteredTopics 
          category="development"
          tags={['milestones', 'growth', 'development']}
        />
      </div>
    </div>
  );
}