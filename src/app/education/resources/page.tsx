'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { ArrowRight, Book, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FilteredTopics from '@/components/FilteredTopics';

// ... rest of the imports

export default function LearningResourcesPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Education', href: '/education' },
          { label: 'Learning Resources' }
        ]} 
      />

      <div className="space-y-8">
        {/* Existing resources content */}
        {resources.map((category) => (
          <div key={category.title} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* ... existing category card content ... */}
          </div>
        ))}

        {/* Add filtered topics */}
        <FilteredTopics 
          category="education"
          tags={['learning', 'resources', 'education']}
        />
      </div>
    </div>
  );
}