'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { Calendar, CheckCircle } from 'lucide-react';

const milestones = [
  {
    title: 'Physical Development',
    description: 'Key physical milestones by age',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9',
    stages: [
      {
        age: '0-3 months',
        milestones: [
          'Raises head and chest when lying on stomach',
          'Stretches legs out and kicks when lying on back or stomach',
          'Opens and shuts hands',
          'Brings hands to face',
          'Pushes down on legs when feet are placed on a hard surface'
        ]
      },
      {
        age: '4-6 months',
        milestones: [
          'Rolls over in both directions',
          'Begins to sit without support',
          'Supports whole weight on legs',
          'Rocks back and forth',
          'Begins to crawl'
        ]
      },
      {
        age: '7-9 months',
        milestones: [
          'Stands holding on',
          'Can get into sitting position',
          'Sits without support',
          'Crawls forward on belly',
          'Transfers objects from one hand to another'
        ]
      }
    ]
  },
  {
    title: 'Social & Emotional',
    description: 'Social and emotional development markers',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
    stages: [
      {
        age: '0-3 months',
        milestones: [
          'Begins to smile at people',
          'Can briefly calm themselves',
          'Tries to look at parent',
          'Coos and makes gurgling sounds',
          'Turns head toward sounds'
        ]
      },
      {
        age: '4-6 months',
        milestones: [
          'Knows familiar faces',
          'Likes to play with others',
          "Responds to others' emotions",
          'Likes to look at self in mirror',
          'Laughs and squeals'
        ]
      }
    ]
  }
];

export default function DevelopmentMilestonesPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Health & Safety', href: '/health' },
          { label: 'Development Milestones' }
        ]} 
      />

      <div className="space-y-8">
        {milestones.map((category) => (
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

                <div className="space-y-6">
                  {category.stages.map((stage) => (
                    <div key={stage.age} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-5 w-5 text-purple-500" />
                        <h3 className="font-medium text-gray-900">{stage.age}</h3>
                      </div>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {stage.milestones.map((milestone) => (
                          <li key={milestone} className="flex items-start text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                            {milestone}
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