'use client';

import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FilteredTopics from '@/components/FilteredTopics';

export default function WellnessPage() {
  const cards = [
    {
      title: "Physical Health",
      description: "Exercise and activity recommendations.",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368",
      href: "/wellness/physical"
    },
    {
      title: "Mental Health",
      description: "Supporting emotional well-being.",
      image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
      href: "/wellness/mental"
    },
    {
      title: "Sleep",
      description: "Sleep schedules and routines.",
      image: "https://images.unsplash.com/photo-1566312922674-6006c6fa8b33",
      href: "/wellness/sleep"
    },
    {
      title: "Nutrition",
      description: "Healthy eating guidelines and meal plans.",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af",
      href: "/wellness/nutrition"
    }
  ];

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Wellness' }
        ]} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        category="wellness"
        tags={['wellness', 'health', 'mental-health', 'physical-health', 'nutrition']}
      />
    </div>
  );
}