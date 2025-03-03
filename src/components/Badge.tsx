import { Badge as BadgeType } from '@/types';

const badgeColors = {
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  green: 'bg-green-100 text-green-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  red: 'bg-red-100 text-red-800',
};

interface BadgeProps {
  badge: BadgeType;
  size?: 'sm' | 'md';
}

export default function Badge({ badge, size = 'md' }: BadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${badgeColors[badge.color]} ${sizeClasses[size]}`}
    >
      <span className="mr-1">{badge.icon}</span>
      {badge.name}
    </span>
  );
}