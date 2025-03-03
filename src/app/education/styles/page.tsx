'use client';

import Breadcrumb from '@/components/Breadcrumb';
import Image from 'next/image';
import { Brain, CheckCircle } from 'lucide-react';

const learningStyles = [
  {
    title: 'Visual Learning',
    description: 'Learning through seeing and watching',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
    characteristics: [
      'Prefers pictures and diagrams',
      'Good at visualization',
      'Enjoys drawing and art',
      'Remembers faces well'
    ],
    strategies: [
      'Use color coding',
      'Create mind maps',
      'Watch educational videos',
      'Use flashcards'
    ]
  },
  {
    title: 'Auditory Learning',
    description: 'Learning through listening and speaking',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
    characteristics: [
      'Learns through listening',
      'Enjoys music and rhythm',
      'Good at verbal instructions',
      'Remembers conversations well'
    ],
    strategies: [
      'Use songs and rhymes',
      'Read aloud together',
      'Have discussions',
      'Use audio books'
    ]
  },
  {
    title: 'Kinesthetic Learning',
    description: 'Learning through movement and touch',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
    characteristics: [
      'Learns by doing',
      'Enjoys physical activities',
      'Good at sports and dance',
      'Needs to move while learning'
    ],
    strategies: [
      'Use hands-on activities',
      'Incorporate movement',
      'Take frequent breaks',
      'Use manipulatives'
    ]
  }
];

export default function LearningStylesPage() {
  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Education', href: '/education' },
          { label: 'Learning Styles' }
        ]} 
      />

      <div className="space-y-8">
        {learningStyles.map((style) => (
          <div key={style.title} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 relative h-48 md:h-auto">
                <Image
                  src={style.image}
                  alt={style.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {style.title}
                </h2>
                <p className="text-gray-600 mb-4">{style.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-500" />
                      <h3 className="font-medium text-gray-900">Characteristics</h3>
                    </div>
                    <ul className="space-y-2">
                      {style.characteristics.map((item) => (
                        <li key={item} className="flex items-start text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-500" />
                      <h3 className="font-medium text-gray-900">Learning Strategies</h3>
                    </div>
                    <ul className="space-y-2">
                      {style.strategies.map((item) => (
                        <li key={item} className="flex items-start text-gray-700">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}