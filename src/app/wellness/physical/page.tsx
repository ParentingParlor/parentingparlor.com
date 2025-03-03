'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { ArrowRight, Activity, Target } from 'lucide-react';
import FilteredTopics from '@/components/FilteredTopics';

// ... rest of the imports

export default function PhysicalHealthPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Wellness', href: '/wellness' },
          { label: 'Physical Health' }
        ]} 
      />

      <div className="space-y-8">
        {/* Existing physical activities content */}
        {physicalActivities.map((category) => (
          <div key={category.title} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* ... existing category card content ... */}
          </div>
        ))}

        {/* Add filtered topics */}
        <FilteredTopics 
          category="wellness"
          tags={['physical', 'exercise', 'activity']}
        />
      </div>
    </div>
  );
}