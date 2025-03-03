import { Badge } from '@/types';

export const badges: Badge[] = [
  {
    id: 'verified-human',
    name: 'Verified Human',
    description: 'Verified real person',
    icon: '✓',
    color: 'green'
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Verified professional in their field',
    icon: '⭐',
    color: 'yellow'
  },
  {
    id: 'top-contributor',
    name: 'Top Contributor',
    description: 'Consistently helpful community member',
    icon: '🏆',
    color: 'purple'
  },
  {
    id: 'experienced-parent',
    name: 'Experienced Parent',
    description: 'Parent with 5+ years experience',
    icon: '👶',
    color: 'blue'
  },
  {
    id: 'helpful',
    name: 'Helpful',
    description: 'Received 100+ helpful votes',
    icon: '🤝',
    color: 'blue'
  }
];