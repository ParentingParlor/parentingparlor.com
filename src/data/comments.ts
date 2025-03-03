'use client';

import { faker } from '@faker-js/faker';
import { Comment } from '@/types';
import { defaultLists } from './defaultLists';

const generateComment = (depth = 0): Comment => {
  const hasReplies = depth < 2 && Math.random() > 0.5;
  const hasLists = Math.random() > 0.7;
  const isVerified = Math.random() > 0.7; // 30% chance of being verified
  
  return {
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    authorIsVerified: isVerified,
    content: faker.lorem.paragraph(),
    timestamp: faker.date.recent().toISOString(),
    likes: faker.number.int({ min: 0, max: 50 }),
    replies: hasReplies ? Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => generateComment(depth + 1)) : undefined,
    attachedLists: hasLists ? [defaultLists[faker.number.int({ min: 0, max: defaultLists.length - 1 })]] : undefined
  };
};

export const generateComments = (count: number): Comment[] => {
  return Array.from({ length: count }, () => generateComment());
};