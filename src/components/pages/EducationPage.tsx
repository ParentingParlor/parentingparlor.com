'use client';

import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import FilteredTopics from '@/components/FilteredTopics';

export default function EducationPage() {
  const cards = [
    {
      title: "Learning Resources",
      description: "Educational materials and activities by age group.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      href: "/education/resources"
    },
    {
      title: "Learning Styles",
      description: "Understand and support different learning approaches.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      href: "/education/styles"
    },
    {
      title: "Activities",
      description: "Educational activities and worksheets.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
      href: "/education/activities"
    }
  ];

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Education' }
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
        category="education"
        tags={['education', 'learning', 'teaching', 'activities']}
      />
    </div>
  );
}