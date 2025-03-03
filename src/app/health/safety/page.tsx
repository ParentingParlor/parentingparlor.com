'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FilteredTopics from '@/components/FilteredTopics';

const safetyTopics = [
  {
    title: 'Home Safety',
    description: 'Childproofing tips and home safety measures for different age groups',
    image: 'https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5',
    items: [
      'Outlet covers and electrical safety',
      'Cabinet locks and drawer safety',
      'Furniture anchoring',
      'Window safety',
    ]
  },
  {
    title: 'Car Safety',
    description: 'Car seat guidelines and vehicle safety recommendations',
    image: 'https://images.unsplash.com/photo-1590361232060-61b9a025a068',
    items: [
      'Car seat installation',
      'Age-appropriate restraints',
      'Vehicle safety checks',
      'Travel safety tips',
    ]
  },
  {
    title: 'Sleep Safety',
    description: 'Safe sleep practices and SIDS prevention guidelines',
    image: 'https://images.unsplash.com/photo-1590333748338-d629e4564ad9',
    items: [
      'Crib safety standards',
      'Sleep position guidelines',
      'Bedding recommendations',
      'Room temperature control',
    ]
  },
  {
    title: 'Outdoor Safety',
    description: 'Playground, water, and outdoor activity safety measures',
    image: 'https://images.unsplash.com/photo-1597524678053-5e6fe6e2d8c5',
    items: [
      'Playground equipment safety',
      'Water safety rules',
      'Sun protection',
      'Outdoor supervision guidelines',
    ]
  }
];

export default function SafetyGuidelinesPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Health & Safety', href: '/health' },
          { label: 'Safety Guidelines' }
        ]} 
      />

      <div className="space-y-8">
        {safetyTopics.map((topic) => (
          <div key={topic.title} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 relative h-48 md:h-auto">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {topic.title}
                </h2>
                <p className="text-gray-600 mb-4">{topic.description}</p>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {topic.items.map((item) => (
                    <li key={item} className="flex items-center text-gray-700">
                      <ArrowRight className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <Link 
                    href={`/health/safety/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-purple-600 hover:text-purple-700"
                  >
                    Learn more
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        <FilteredTopics 
          category="health"
          tags={['safety', 'childproofing', 'prevention']}
        />
      </div>
    </div>
  );
}