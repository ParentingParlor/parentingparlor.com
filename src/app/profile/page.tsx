'use client';

import { useState } from 'react';
import { useUser, usePoints } from '@/context/UserContext';
import { Shield, Baby, List, MapPin, MessageCircle, ThumbsUp, Clock, Star, Plus, Heart, Edit, Award, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Badge from '@/components/Badge';
import { badges } from '@/data/badges';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import ChildInfo from '@/components/ChildInfo';
import { Child } from '@/types';
import { defaultLists } from '@/data/defaultLists';

// Mock activity types
type ActivityType = 'comment' | 'post' | 'like' | 'list' | 'follow' | 'achievement';

interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  target: string;
  timestamp: string;
  icon: React.ReactNode;
}

// Generate random past date within the last 30 days
const getRandomPastDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30) + 1;
  const pastDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  return pastDate;
};

// Format date as relative time (e.g., "2 days ago")
const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
  
  return date.toLocaleDateString();
};

// Generate mock activities
const generateMockActivities = (): Activity[] => {
  const activityTypes: ActivityType[] = ['comment', 'post', 'like', 'list', 'follow', 'achievement'];
  const activityIcons = {
    comment: <MessageCircle className="h-4 w-4 text-blue-500" />,
    post: <Edit className="h-4 w-4 text-green-500" />,
    like: <ThumbsUp className="h-4 w-4 text-red-500" />,
    list: <List className="h-4 w-4 text-purple-500" />,
    follow: <Plus className="h-4 w-4 text-yellow-500" />,
    achievement: <Star className="h-4 w-4 text-amber-500" />
  };
  
  const topicTitles = [
    "Sleep training methods",
    "Feeding schedule for toddlers",
    "Potty training challenges",
    "Healthy snacks for preschoolers",
    "Managing tantrums effectively",
    "First day of school preparation",
    "Balancing work and parenting",
  ];
  
  const listTitles = [
    "Essential baby gear",
    "Toddler-friendly recipes",
    "Educational toys",
    "Bedtime story favorites",
    "Childproofing products"
  ];
  
  const userNames = [
    "Sarah J.",
    "Michael T.",
    "Amanda K.",
    "David L.",
    "Jessica P."
  ];
  
  const activities: Activity[] = [];
  
  // Generate 30 random activities
  for (let i = 0; i < 30; i++) {
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    let description = "";
    let target = "";
    
    switch (type) {
      case 'comment':
        description = "You commented on";
        target = topicTitles[Math.floor(Math.random() * topicTitles.length)];
        break;
      case 'post':
        description = "You posted";
        target = topicTitles[Math.floor(Math.random() * topicTitles.length)];
        break;
      case 'like':
        description = "You liked";
        target = topicTitles[Math.floor(Math.random() * topicTitles.length)];
        break;
      case 'list':
        description = "You updated your list";
        target = listTitles[Math.floor(Math.random() * listTitles.length)];
        break;
      case 'follow':
        description = "You followed";
        target = userNames[Math.floor(Math.random() * userNames.length)];
        break;
      case 'achievement':
        description = "You earned the badge";
        target = "Helpful Contributor";
        break;
    }
    
    const date = getRandomPastDate();
    
    activities.push({
      id: `activity-${i}`,
      type,
      description,
      target,
      timestamp: date.toISOString(),
      icon: activityIcons[type]
    });
  }
  
  // Sort by timestamp (newest first)
  return activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export default function ProfilePage() {
  const user = useUser();
  const { points } = usePoints();
  const [userBadges] = useState(badges.slice(0, 2)); // Mock some badges
  const [children, setChildren] = useState<Child[]>([
    {
      id: '1',
      name: 'Emma',
      birthDate: '2021-05-15',
      isPublic: true,
    },
    {
      id: '2',
      name: 'Noah',
      birthDate: '2019-11-22',
      isPublic: false,
    }
  ]);
  
  // Get 3 most recent lists from defaultLists with added timestamps
  const recentLists = defaultLists.map(list => ({
    ...list,
    updatedAt: getRandomPastDate().toISOString(),
  }))
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 3);
  
  // Generate mock activities
  const [activities] = useState<Activity[]>(generateMockActivities());

  const handleUpdateChildren = (updatedChildren: Child[]) => {
    setChildren(updatedChildren);
    // Here you would typically update this in your database or context
    console.log('Children updated:', updatedChildren);
  };

  // Helper to format large numbers with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Get recent point activities
  const recentPointActivities = points.activities.slice(0, 3);

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Profile' }
        ]} 
      />

      <div className="space-y-6">
        {/* Profile Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-purple-200 flex items-center justify-center">
              <span className="text-purple-700 font-semibold text-3xl">
                {user.name[0]}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <MapPin className="h-4 w-4" />
                <span>{user.location.city}, {user.location.state}</span>
              </div>
              <div className="flex gap-2 mt-3">
                {userBadges.map((badge) => (
                  <Badge key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">127</div>
              <div className="text-sm text-gray-500">Topics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1.2k</div>
              <div className="text-sm text-gray-500">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">892</div>
              <div className="text-sm text-gray-500">Helpful Votes</div>
            </div>
          </div>
        </div>

        {/* Points Summary */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-purple-600" />
              <h2 className="font-semibold text-gray-900">Points Summary</h2>
            </div>
            <Link href="/profile/points">
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-full">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">{formatNumber(points.total)}</div>
                <div className="text-xs text-gray-500">Total Points</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">{formatNumber(points.thisMonth)}</div>
                <div className="text-xs text-gray-500">This Month</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-full">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900">${formatNumber(points.rewards.reduce((sum, reward) => sum + reward.amount, 0) / 100)}</div>
                <div className="text-xs text-gray-500">Total Rewards</div>
              </div>
            </div>
          </div>
          
          {recentPointActivities.length > 0 && (
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Point Activities</h3>
              <div className="space-y-2">
                {recentPointActivities.map((activity) => (
                  <div key={activity.id} className="flex justify-between items-center text-sm py-1">
                    <span className="text-gray-600">{activity.description}</span>
                    <span className={`font-medium ${activity.points >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {activity.points >= 0 ? '+' : ''}{activity.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-center mt-4">
            <Link href="/profile/points">
              <Button variant="outline" size="sm">
                View All Points & Rewards
              </Button>
            </Link>
          </div>
        </div>

        {/* Lists and Children */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <List className="h-5 w-5 text-purple-600" />
                <h2 className="font-semibold text-gray-900">My Lists</h2>
              </div>
              <Link href="/profile/my-lists">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentLists.map((list) => (
                <Link 
                  key={list.id} 
                  href={`/lists/${list.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{list.title}</h3>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <span>{list.type === 'baby-names' ? `${list.babyNames?.length || 0} names` : `${list.items.length} items`}</span>
                      <span className="mx-2">•</span>
                      <span>Updated {formatRelativeTime(list.updatedAt)}</span>
                    </div>
                  </div>
                  {list.type === 'products' && (
                    <Heart className="h-4 w-4 text-gray-400" />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Baby className="h-5 w-5 text-purple-600" />
                <h2 className="font-semibold text-gray-900">Children</h2>
              </div>
            </div>
            <ChildInfo
              children={children}
              onUpdate={handleUpdateChildren}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <h2 className="font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <Button variant="ghost" size="sm">View All</Button>
          </div>
          
          <div className="space-y-1">
            {activities.slice(0, 10).map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="mr-3 flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">
                    {activity.description} <span className="font-medium">"{activity.target}"</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {activities.length > 10 && (
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                Show More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}