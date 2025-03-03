'use client';

import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FilteredTopics from '@/components/FilteredTopics';

export default function HealthPage() {
  const cards = [
    {
      title: "Safety Guidelines",
      description: "Essential safety tips and guidelines for different age groups.",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
      href: "/health/safety"
    },
    {
      title: "Health Basics",
      description: "Common health concerns and when to seek medical attention.",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528",
      href: "/health/basics"
    },
    {
      title: "Development Milestones",
      description: "Track and understand your child's developmental progress.",
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9",
      href: "/health/milestones"
    }
  ];

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Health & Safety' }
        ]} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Health & Safety Topics</h2>
        <FilteredTopics 
          category="health"
          tags={['health', 'safety', 'medical', 'childproofing']}
        />
      </div>
    </div>
  );
}