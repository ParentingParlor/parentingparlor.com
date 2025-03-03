'use client';

import { UserList } from '@/types/list';

export const defaultLists: UserList[] = [
  {
    id: 'baby-names',
    title: 'Baby Names',
    description: 'Names I\'m considering for my little one',
    type: 'baby-names',
    privacy: 'private',
    items: [],
    babyNames: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['names', 'planning']
  },
  {
    id: 'websites',
    title: 'Helpful Websites',
    description: 'Useful parenting resources and websites',
    type: 'custom',
    privacy: 'private',
    items: [
      {
        id: '1',
        title: 'CDC Milestone Tracker',
        description: 'Official CDC website for tracking developmental milestones',
        url: 'https://www.cdc.gov/ncbddd/actearly/milestones/index.html',
        addedAt: new Date().toISOString(),
        notes: 'Great for checking developmental progress'
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['resources', 'websites']
  },
  {
    id: 'products',
    title: 'Products',
    description: 'Products I have, want, or recommend',
    type: 'products',
    privacy: 'private',
    items: [
      {
        id: '1',
        title: 'Hatch Rest+ Sound Machine',
        description: 'Smart sound machine, night light, and time-to-rise',
        url: 'https://www.amazon.com/dp/B07WFXGKTQ',
        price: 69.99,
        priority: 'high',
        status: 'recommend',
        rating: 5,
        review: 'Essential for establishing sleep routines',
        addedAt: new Date().toISOString()
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['products', 'registry']
  },
  {
    id: 'books',
    title: 'Parenting Books',
    description: 'Books for parents and children',
    type: 'books',
    privacy: 'private',
    items: [
      {
        id: '1',
        title: 'The Whole-Brain Child',
        description: 'By Daniel J. Siegel and Tina Payne Bryson',
        url: 'https://www.amazon.com/dp/0553386697',
        price: 14.99,
        status: 'have',
        rating: 5,
        review: 'Excellent resource for understanding child development',
        addedAt: new Date().toISOString()
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['books', 'resources']
  },
  {
    id: 'streaming',
    title: 'Shows & Videos',
    description: 'Age-appropriate shows and educational content',
    type: 'streaming',
    privacy: 'private',
    items: [
      {
        id: '1',
        title: 'Daniel Tiger\'s Neighborhood',
        description: 'PBS Kids show teaching social-emotional skills',
        url: 'https://www.pbs.org/show/daniel-tigers-neighborhood/',
        status: 'recommend',
        ageRange: '2-5',
        platform: 'PBS Kids',
        addedAt: new Date().toISOString()
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['media', 'education']
  }
];