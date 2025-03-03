'use client';

import { BabyName } from '@/types/list';
import { faker } from '@faker-js/faker';

const syllableCount = (name: string): number => {
  return name.toLowerCase()
    .replace(/[^aeiouy]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean).length;
};

const generateNickname = (name: string): string | undefined => {
  if (name.length <= 3) return undefined;
  
  // Common nickname patterns
  if (name.startsWith('Will')) return 'Will';
  if (name.startsWith('Rob')) return 'Rob';
  if (name.startsWith('Beth')) return 'Beth';
  if (name.startsWith('Chris')) return 'Chris';
  if (name.startsWith('Alex')) return 'Alex';
  
  // Generate a shortened version
  return name.slice(0, 3);
};

const generateHistoricalRanks = (): { [key: string]: number } => {
  const years = ['2020', '2021', '2022'];
  const ranks: { [key: string]: number } = {};
  
  years.forEach(year => {
    ranks[year] = faker.number.int({ min: 1, max: 1000 });
  });
  
  return ranks;
};

export const generateBabyNames = (count: number): BabyName[] => {
  const names: BabyName[] = [];
  const usedNames = new Set();

  while (names.length < count) {
    const gender = faker.helpers.arrayElement(['male', 'female', 'unisex']) as 'male' | 'female' | 'unisex';
    let name = '';
    
    // Generate name based on gender
    if (gender === 'male') {
      name = faker.person.firstName('male');
    } else if (gender === 'female') {
      name = faker.person.firstName('female');
    } else {
      name = faker.helpers.arrayElement([
        'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Sam', 'Jamie',
        'Quinn', 'Avery', 'Parker', 'Blake', 'Charlie', 'Skylar', 'Phoenix'
      ]);
    }

    // Skip if name already exists
    if (usedNames.has(name.toLowerCase())) continue;
    usedNames.add(name.toLowerCase());

    const nickname = generateNickname(name);
    const rank = faker.number.int({ min: 1, max: 1000 });

    names.push({
      id: faker.string.uuid(),
      name,
      meaning: faker.lorem.sentence(),
      origin: faker.helpers.arrayElement([
        'English', 'Latin', 'Greek', 'Hebrew', 'Arabic', 'Celtic', 'Germanic',
        'Nordic', 'Spanish', 'French', 'Italian', 'Japanese', 'Chinese', 'Indian',
        'Persian', 'Russian', 'African', 'Irish', 'Welsh', 'Scottish'
      ]),
      gender,
      popularity: faker.number.int({ min: 1, max: 100 }),
      pronunciation: faker.helpers.arrayElement([undefined, name.toUpperCase()]),
      favorite: false,
      length: name.length,
      nickname,
      nicknameLength: nickname?.length,
      rank,
      yearRank: generateHistoricalRanks(),
      syllables: syllableCount(name),
    });
  }

  // Sort by rank
  return names.sort((a, b) => (a.rank || 1000) - (b.rank || 1000));
};