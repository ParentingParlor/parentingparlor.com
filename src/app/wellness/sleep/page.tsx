'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { Moon, Sun, AlertCircle } from 'lucide-react';

const sleepGuidance = [
  {
    title: 'Sleep Schedules',
    description: 'Age-appropriate sleep schedules and routines',
    image: 'https://images.unsplash.com/photo-1566312922674-6006c6fa8b33',
    categories: [
      {
        title: 'Recommended Sleep Duration',
        items: [
          'Newborns (0-3 months): 14-17 hours',
          'Infants (4-11 months): 12-15 hours',
          'Toddlers (1-2 years): 11-14 hours',
          'Preschoolers (3-5 years): 10-13 hours'
        ],
        type: 'info'
      },
      {
        title: 'Sleep Routine Tips',
        items: [
          'Consistent bedtime schedule',
          'Calming bedtime routine',
          'Comfortable sleep environment',
          'Limited screen time before bed'
        ],
        type: 'tips'
      }
    ]
  },
  {
    title: 'Sleep Challenges',
    description: 'Common sleep issues and solutions',
    image: 'https://images.unsplash.com/photo-1558822029-a45925123d2c',
    categories: [
      {
        title: 'Common Issues',
        items: [
          'Night wakings',
          'Bedtime resistance',
          'Early morning wakings',
          'Sleep transitions'
        ],
        type: 'warning'
      },
      {
        title: 'Solutions',
        items: [
          'Gradual sleep training',
          'Consistent response strategy',
          'Environmental adjustments',
          'Age-appropriate schedules'
        ],
        type: 'solution'
      }
    ]
  }
];

const categoryIcons = {
  info: Sun,
  tips: Moon,
  warning: AlertCircle,
  solution: Moon
};

const categoryColors = {
  info: 'text-blue-500',
  tips: 'text-purple-500',
  warning: 'text-yellow-500',
  solution: 'text-green-500'
};

export default function SleepPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Wellness', href: '/wellness' },
          { label: 'Sleep' }
        ]} 
      />

      <div className="space-y-8">
        {sleepGuidance.map((guide) => (
          <div key={guide.title} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 relative h-48 md:h-auto">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {guide.title}
                </h2>
                <p className="text-gray-600 mb-4">{guide.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  {guide.categories.map((category) => {
                    const Icon = categoryIcons[category.type];
                    const colorClass = categoryColors[category.type];

                    return (
                      <div key={category.title} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Icon className={`h-5 w-5 ${colorClass}`} />
                          <h3 className="font-medium text-gray-900">{category.title}</h3>
                        </div>
                        <ul className="space-y-2">
                          {category.items.map((item) => (
                            <li key={item} className="flex items-start text-gray-700">
                              <div className={`h-1.5 w-1.5 rounded-full ${colorClass} mt-2 mr-2`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}