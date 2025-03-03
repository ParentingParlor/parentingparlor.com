'use client';

import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FilteredTopics from '@/components/FilteredTopics';

export default function DevelopmentPage() {
  const cards = [
    {
      title: "Age-Based Milestones",
      description: "Track development milestones by age group and stage.",
      image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
      href: "/development/milestones"
    },
    {
      title: "Development Goals",
      description: "Set and track development goals for your child.",
      image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4",
      href: "/development/goals"
    },
    {
      title: "Learning Progress",
      description: "Monitor and support your child's learning journey.",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
      href: "/development/learning"
    }
  ];

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Development' }
        ]} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link key={card.title} href={card.href}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden flex h-48 hover:shadow-md transition-shadow">
              <div 
                className="w-1/4 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="flex-1 p-6">
                <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <FilteredTopics 
        category="development"
        tags={['development', 'milestones', 'growth', 'learning']}
      />
    </div>
  );
}