'use client';

import { faker } from '@faker-js/faker';
import { Topic } from '@/types';
import { defaultLists } from './defaultLists';
import { generateComments } from './comments';

// DC area coordinates with slight variations
const dcAreaLocations = [
  { city: 'Washington', state: 'DC', lat: 38.8951, lng: -77.0364 },
  { city: 'Arlington', state: 'VA', lat: 38.8799, lng: -77.1067 },
  { city: 'Alexandria', state: 'VA', lat: 38.8048, lng: -77.0469 },
  { city: 'Bethesda', state: 'MD', lat: 38.9847, lng: -77.0947 },
  { city: 'Silver Spring', state: 'MD', lat: 38.9959, lng: -77.0284 },
];

// Other major city coordinates
const otherLocations = [
  { city: 'New York', state: 'NY', lat: 40.7128, lng: -74.0060 },
  { city: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437 },
  { city: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298 },
  { city: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698 },
];

const calculateHotScore = (likes: number, createdAt: string): number => {
  const order = Math.log10(Math.max(Math.abs(likes), 1));
  const sign = likes > 0 ? 1 : likes < 0 ? -1 : 0;
  const seconds = new Date(createdAt).getTime() / 1000 - 1577836800;
  return Math.round((sign * order + seconds / 45000) * 10000) / 10000;
};

const generateTopic = (index: number): Topic => {
  const createdAt = faker.date.recent({ days: 30 }).toISOString();
  const likes = faker.number.int({ min: 0, max: 1000 });
  const views = faker.number.int({ min: likes, max: likes * 10 });
  const weeklyViews = faker.number.int({ min: 0, max: views / 4 });
  const hasLists = Math.random() > 0.7;
  const hasImage = Math.random() > 0.6;
  const isVerified = Math.random() > 0.7; // 30% chance of being verified

  // Make 30% of posts from DC area
  const isLocalPost = index % 3 === 0;
  const location = isLocalPost
    ? dcAreaLocations[faker.number.int({ min: 0, max: dcAreaLocations.length - 1 })]
    : otherLocations[faker.number.int({ min: 0, max: otherLocations.length - 1 })];

  const content = [
    faker.lorem.paragraph(5),
    faker.lorem.paragraph(4),
    faker.lorem.paragraph(3),
    faker.lorem.paragraph(4),
    faker.lorem.paragraph(3),
  ].join('\n\n');

  const selectedTags = faker.helpers.arrayElements(
    ['newborn', 'infant', 'toddler', 'preschool', 'sleep', 'nutrition', 'behavior', 'health', 'development', 'education', 'safety', 'milestones'],
    faker.number.int({ min: 2, max: 4 })
  );

  const images = [
    'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7',
    'https://images.unsplash.com/photo-1505944270255-72b8c68c6a70',
    'https://images.unsplash.com/photo-1516627145497-ae6968895b74',
    'https://images.unsplash.com/photo-1607972969777-5a05eda6b9d5',
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289',
  ];

  const topic: Topic = {
    slug: faker.helpers.slugify(faker.lorem.sentence().toLowerCase()),
    title: faker.lorem.sentence(),
    author: {
      name: faker.person.fullName(),
      location: `${location.city}, ${location.state}`,
      coordinates: {
        latitude: location.lat,
        longitude: location.lng
      },
      isVerified: isVerified,
      verifiedDate: isVerified ? faker.date.past({ years: 1 }).toISOString() : undefined
    },
    communityResponses: faker.number.int({ min: 0, max: 200 }),
    likes,
    content,
    references: [
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
    ],
    tags: selectedTags,
    category: faker.helpers.arrayElement(['health', 'development', 'behavior', 'education']),
    createdAt,
    updatedAt: faker.date.between({ from: createdAt, to: new Date() }).toISOString(),
    views,
    weeklyViews,
    score: calculateHotScore(likes, createdAt),
    imageUrl: hasImage ? faker.helpers.arrayElement(images) : undefined,
    comments: generateComments(faker.number.int({ min: 1, max: 5 })),
    attachedLists: hasLists ? faker.helpers.arrayElements(defaultLists, faker.number.int({ min: 1, max: 2 })) : undefined,
  };
  return topic
};

export const generateTopics = (count: number): Topic[] => {
  return Array.from({ length: count }, (_, index) => generateTopic(index));
};