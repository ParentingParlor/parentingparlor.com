'use client';

import { UserList, ListItem } from '@/types/list';
import { faker } from '@faker-js/faker';

function generateItems(count: number, type: UserList['type']): ListItem[] {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    url: type === 'products' ? faker.internet.url() : undefined,
    price: type === 'products' ? parseFloat(faker.commerce.price()) : undefined,
    addedAt: faker.date.recent().toISOString(),
    priority: faker.helpers.arrayElement(['low', 'medium', 'high']),
    status: faker.helpers.arrayElement(['have', 'want', 'recommend']),
    rating: faker.number.int({ min: 1, max: 5 }),
    review: faker.lorem.sentence(),
  }));
}

// Generate 30 community lists
export const communityLists: UserList[] = Array.from({ length: 30 }, (_, i) => {
  const type = faker.helpers.arrayElement(['products', 'baby-names', 'books', 'streaming', 'custom']) as UserList['type'];
  const itemCount = faker.number.int({ min: 5, max: 30 });

  return {
    id: faker.string.uuid(),
    title: faker.helpers.arrayElement([
      'Essential Baby Items',
      'Favorite Books',
      'Educational Shows',
      'Safety Products',
      'Feeding Schedule',
      'Sleep Training Tips',
      'Development Activities',
      'Travel Must-Haves',
      'Parenting Resources',
      'Meal Planning Ideas'
    ]) + ` ${i + 1}`,
    description: faker.lorem.sentence(),
    type,
    privacy: 'public',
    items: generateItems(itemCount, type),
    createdAt: faker.date.recent({ days: 30 }).toISOString(),
    updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    tags: faker.helpers.arrayElements(
      ['newborn', 'toddler', 'preschool', 'safety', 'education', 'health', 'development', 'nutrition', 'sleep', 'activities'],
      faker.number.int({ min: 2, max: 4 })
    ),
    author: {
      name: faker.person.fullName(),
      avatar: faker.person.firstName()[0]
    },
    saves: faker.number.int({ min: 10, max: 500 })
  };
});

// Popular lists (subset of community lists with highest saves)
export const popularCommunityLists = [...communityLists]
  .sort((a, b) => (b.saves || 0) - (a.saves || 0))
  .slice(0, 5);