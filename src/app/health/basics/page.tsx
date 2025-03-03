'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, AlertCircle } from 'lucide-react';
import FilteredTopics from '@/components/FilteredTopics';

const healthTopics = [
  {
    title: 'Common Illnesses',
    description: 'Understanding and managing common childhood illnesses',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
    urgencyLevel: 'low',
    items: [
      'Fever management',
      'Cold and flu care',
      'Stomach bugs',
      'Ear infections',
    ]
  },
  {
    title: 'Emergency Care',
    description: 'When to seek immediate medical attention',
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b',
    urgencyLevel: 'high',
    items: [
      'High fever symptoms',
      'Breathing difficulties',
      'Severe injuries',
      'Allergic reactions',
    ]
  },
  {
    title: 'Preventive Care',
    description: 'Regular check-ups and vaccination schedules',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309',
    urgencyLevel: 'medium',
    items: [
      'Vaccination schedule',
      'Well-child visits',
      'Dental care',
      'Vision screening',
    ]
  },
  {
    title: 'Nutrition & Diet',
    description: 'Age-appropriate nutrition guidelines and dietary needs',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af',
    urgencyLevel: 'low',
    items: [
      'Balanced diet basics',
      'Food allergies',
      'Meal planning',
      'Healthy snacks',
    ]
  }
];

const urgencyColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export default function HealthBasicsPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Health & Safety', href: '/health' },
          { label: 'Health Basics' }
        ]} 
      />

      <div className="space-y-8">
        {healthTopics.map((topic) => (
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
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {topic.title}
                  </h2>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${urgencyColors[topic.urgencyLevel]}`}>
                    {topic.urgencyLevel === 'high' && <AlertCircle className="h-3 w-3 mr-1" />}
                    {topic.urgencyLevel.charAt(0).toUpperCase() + topic.urgencyLevel.slice(1)} Priority
                  </span>
                </div>
                
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
                    href={`/health/basics/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
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
          tags={['health', 'medical', 'illness']}
        />
      </div>
    </div>
  );
}