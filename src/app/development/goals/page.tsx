'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { ArrowRight, Target, CheckCircle } from 'lucide-react';

const developmentGoals = [
  {
    title: 'Physical Goals',
    description: 'Track and support physical development milestones',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
    goals: [
      {
        title: 'Gross Motor Skills',
        items: ['Walking', 'Running', 'Jumping', 'Balance']
      },
      {
        title: 'Fine Motor Skills',
        items: ['Grasping objects', 'Drawing', 'Writing', 'Using utensils']
      }
    ]
  },
  {
    title: 'Cognitive Goals',
    description: 'Support learning and cognitive development',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
    goals: [
      {
        title: 'Problem Solving',
        items: ['Pattern recognition', 'Puzzles', 'Basic counting', 'Shape sorting']
      },
      {
        title: 'Language Development',
        items: ['Word recognition', 'Simple sentences', 'Following instructions', 'Story comprehension']
      }
    ]
  }
];

export default function DevelopmentGoalsPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Development', href: '/development' },
          { label: 'Development Goals' }
        ]} 
      />

      <div className="space-y-8">
        {developmentGoals.map((category) => (
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
                  {category.goals.map((goalGroup) => (
                    <div key={goalGroup.title} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-purple-500" />
                        <h3 className="font-medium text-gray-900">{goalGroup.title}</h3>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {goalGroup.items.map((item) => (
                          <li key={item} className="flex items-start text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
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