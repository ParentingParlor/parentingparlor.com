'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { Clock, Target, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const activities = [
  {
    title: 'Sensory Activities',
    description: 'Engaging activities for sensory development',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
    activities: [
      {
        name: 'Texture Exploration',
        duration: '20 mins',
        ageGroup: '1-3 years',
        difficulty: 'Easy',
        materials: ['Different fabrics', 'Safe household items', 'Containers']
      },
      {
        name: 'Color Mixing',
        duration: '30 mins',
        ageGroup: '2-4 years',
        difficulty: 'Medium',
        materials: ['Washable paint', 'Paper', 'Brushes', 'Mixing trays']
      }
    ]
  },
  {
    title: 'Cognitive Activities',
    description: 'Brain-boosting activities for learning and development',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    activities: [
      {
        name: 'Pattern Building',
        duration: '25 mins',
        ageGroup: '3-5 years',
        difficulty: 'Medium',
        materials: ['Blocks', 'Shape cards', 'Counting objects']
      },
      {
        name: 'Memory Games',
        duration: '15 mins',
        ageGroup: '4-6 years',
        difficulty: 'Medium',
        materials: ['Picture cards', 'Matching sets', 'Timer']
      }
    ]
  }
];

const difficultyColors = {
  Easy: 'text-green-600 bg-green-50',
  Medium: 'text-yellow-600 bg-yellow-50',
  Hard: 'text-red-600 bg-red-50'
};

export default function EducationalActivitiesPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Education', href: '/education' },
          { label: 'Activities' }
        ]} 
      />

      <div className="space-y-8">
        {activities.map((category) => (
          <div key={category.title} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 relative h-48 md:h-auto">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </h2>
                <p className="text-gray-600 mb-4">{category.description}</p>

                <div className="space-y-4">
                  {category.activities.map((activity) => (
                    <div key={activity.name} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-gray-900 mb-2">{activity.name}</h3>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <span className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-1" />
                              {activity.duration}
                            </span>
                            <span className="flex items-center text-gray-600">
                              <Target className="h-4 w-4 mr-1" />
                              {activity.ageGroup}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full ${difficultyColors[activity.difficulty]}`}>
                              {activity.difficulty}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Activity
                        </Button>
                      </div>

                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Materials Needed:</h4>
                        <div className="flex flex-wrap gap-2">
                          {activity.materials.map((material) => (
                            <span
                              key={material}
                              className="inline-flex items-center px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs"
                            >
                              <Star className="h-3 w-3 mr-1" />
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}