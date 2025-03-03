'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { ArrowRight, BookOpen, Star } from 'lucide-react';

const learningProgress = [
  {
    title: 'Early Learning',
    description: 'Track early learning milestones and activities',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
    areas: [
      {
        title: 'Basic Concepts',
        skills: [
          'Colors and shapes',
          'Numbers 1-10',
          'Basic vocabulary',
          'Simple patterns'
        ]
      },
      {
        title: 'Social Skills',
        skills: [
          'Taking turns',
          'Sharing',
          'Following instructions',
          'Group participation'
        ]
      }
    ]
  },
  {
    title: 'Pre-School Learning',
    description: 'Monitor pre-school readiness and progress',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
    areas: [
      {
        title: 'Academic Foundation',
        skills: [
          'Letter recognition',
          'Number concepts',
          'Basic writing',
          'Story comprehension'
        ]
      },
      {
        title: 'Creative Development',
        skills: [
          'Art expression',
          'Music appreciation',
          'Imaginative play',
          'Problem-solving'
        ]
      }
    ]
  }
];

export default function LearningProgressPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Development', href: '/development' },
          { label: 'Learning Progress' }
        ]} 
      />

      <div className="space-y-8">
        {learningProgress.map((category) => (
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
                  {category.areas.map((area) => (
                    <div key={area.title} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-purple-500" />
                        <h3 className="font-medium text-gray-900">{area.title}</h3>
                      </div>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {area.skills.map((skill) => (
                          <li key={skill} className="flex items-start text-gray-700">
                            <Star className="h-4 w-4 text-yellow-500 mr-2 mt-1 flex-shrink-0" />
                            {skill}
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