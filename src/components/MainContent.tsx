'use client';

import { useState } from 'react';
import { Flame, TrendingUp, Clock, Star, MapPin } from 'lucide-react';
import { Topic } from '@/types';
import TopicCard from './TopicCard';
import { Button } from './ui/button';
import { useUser } from '@/context/UserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { topics } from '@/data/topics';

const sortOptions = [
  { id: 'hot', label: 'Hot', icon: Flame },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'new', label: 'New', icon: Clock },
  { id: 'top', label: 'Top', icon: Star },
  { id: 'local', label: 'Local', icon: MapPin },
] as const;

const timeRanges = [
  { value: '7d', label: '7D' },
  { value: '1m', label: '1M' },
  { value: '1y', label: '1Y' },
  { value: 'all', label: 'All' },
] as const;

type SortOption = typeof sortOptions[number]['id'];
type TimeRange = typeof timeRanges[number]['value'];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3963; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function MainContent() {
  const user = useUser();
  const [sortBy, setSortBy] = useState<SortOption>('hot');
  const [timeRange, setTimeRange] = useState<TimeRange>('1m');

  const getTimeRangeDate = (range: TimeRange) => {
    const now = new Date();
    switch (range) {
      case '7d':
        return new Date(now.setDate(now.getDate() - 7));
      case '1m':
        return new Date(now.setMonth(now.getMonth() - 1));
      case '1y':
        return new Date(now.setFullYear(now.getFullYear() - 1));
      default:
        return new Date(0);
    }
  };

  const filterByTimeRange = (topic: Topic) => {
    const cutoffDate = getTimeRangeDate(timeRange);
    return new Date(topic.createdAt) >= cutoffDate;
  };

  const isLocal = (topic: Topic) => {
    if (!topic.author.coordinates) return false;
    const distance = calculateDistance(
      user.location.coordinates.latitude,
      user.location.coordinates.longitude,
      topic.author.coordinates.latitude,
      topic.author.coordinates.longitude
    );
    return distance <= 100; // Within 100 miles radius
  };

  const sortTopics = (topics: Topic[]) => {
    const filteredTopics = topics.filter(filterByTimeRange);

    if (sortBy === 'local') {
      return filteredTopics.filter(isLocal);
    }

    switch (sortBy) {
      case 'hot':
        return [...filteredTopics].sort((a, b) => b.score - a.score);
      case 'trending':
        return [...filteredTopics].sort((a, b) => b.weeklyViews - a.weeklyViews);
      case 'new':
        return [...filteredTopics].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'top':
        return [...filteredTopics].sort((a, b) => b.likes - a.likes);
      default:
        return filteredTopics;
    }
  };

  const sortedTopics = sortTopics(topics);

  return (
    <div className="flex-1 min-w-0">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          {/* Sort options bar */}
          <div className="bg-white rounded-md mb-4 border">
            <div className="overflow-x-auto">
              <div className="flex items-center justify-between p-2 sm:px-4">
                <div className="flex">
                  {sortOptions.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setSortBy(id)}
                      className={`flex items-center px-4 py-3 hover:bg-gray-50 ${
                        sortBy === id ? 'border-b-2 border-purple-500' : ''
                      }`}
                    >
                      <Icon className={`h-5 w-5 mr-2 ${
                        sortBy === id ? 'text-purple-500' : 'text-gray-500'
                      }`} />
                      <span className={sortBy === id ? 'text-purple-500' : 'text-gray-500'}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-9 my-1.5 whitespace-nowrap"
                    >
                      {timeRanges.find(r => r.value === timeRange)?.label}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-24">
                    <DropdownMenuRadioGroup value={timeRange} onValueChange={setTimeRange}>
                      {timeRanges.map((range) => (
                        <DropdownMenuRadioItem 
                          key={range.value} 
                          value={range.value}
                          className="justify-center font-medium"
                        >
                          {range.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Topic cards */}
          <div className="space-y-4">
            {sortedTopics.map((topic) => (
              <TopicCard key={topic.slug} topic={topic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}