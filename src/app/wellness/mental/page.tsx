'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { Heart, CheckCircle } from 'lucide-react';
import FilteredTopics from '@/components/FilteredTopics';

// ... rest of the imports

export default function MentalHealthPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Wellness', href: '/wellness' },
          { label: 'Mental Health' }
        ]} 
      />

      <div className="space-y-8">
        {/* Existing mental health topics content */}
        {mentalHealthTopics.map((topic) => (
          <div key={topic.title} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* ... existing topic card content ... */}
          </div>
        ))}

        {/* Add filtered topics */}
        <FilteredTopics 
          category="wellness"
          tags={['mental-health', 'emotional', 'behavior']}
        />
      </div>
    </div>
  );
}