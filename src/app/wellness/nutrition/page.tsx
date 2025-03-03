'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { Apple, AlertTriangle, Check } from 'lucide-react';
import FilteredTopics from '@/components/FilteredTopics';

// ... rest of the imports

export default function NutritionPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Wellness', href: '/wellness' },
          { label: 'Nutrition' }
        ]} 
      />

      <div className="space-y-8">
        {/* Existing nutrition topics content */}
        {nutritionTopics.map((topic) => (
          <div key={topic.title} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* ... existing topic card content ... */}
          </div>
        ))}

        {/* Add filtered topics */}
        <FilteredTopics 
          category="wellness"
          tags={['nutrition', 'food', 'diet']}
        />
      </div>
    </div>
  );
}