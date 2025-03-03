import { PointActivity, UserPoints } from '@/types';

// Point values for different activities
export const POINTS = {
  LOGIN: 5,
  PAGE_VIEW: 1,
  COMMENT: 10,
  REPLY: 5,
  POST_TOPIC: 50,
  INVITE_SENT: 5,
  INVITE_ACCEPTED: 100,
  LIKE_RECEIVED: 2,
  PRODUCT_REVIEW: 15,
  REVIEW_VOTED_HELPFUL: 2,
  FIRST_OFFER_CLAIM: 25,
};

/**
 * Award points to a user for a specific activity
 */
export function awardPoints(userPoints: UserPoints, type: PointActivity['type'], amount: number, description: string): UserPoints {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  const activity: PointActivity = {
    id: Math.random().toString(36).substring(2, 15),
    type,
    points: amount,
    description,
    timestamp: now.toISOString(),
  };

  // Update monthly points
  let monthlyPoints = userPoints.thisMonth + amount;
  let monthlyHistory = [...userPoints.history];
  
  const existingMonthIndex = monthlyHistory.findIndex(h => h.month === currentMonth);
  if (existingMonthIndex >= 0) {
    monthlyHistory[existingMonthIndex].points += amount;
  } else {
    monthlyHistory.push({ month: currentMonth, points: amount });
  }
  
  return {
    ...userPoints,
    total: userPoints.total + amount,
    thisMonth: monthlyPoints,
    lastUpdated: now.toISOString(),
    history: monthlyHistory,
    activities: [activity, ...userPoints.activities.slice(0, 99)], // Keep last 100 activities
  };
}

/**
 * Calculate if user is in the top 10% based on points
 */
export function calculateTopPercentile(userPoints: number, allUsersPoints: number[]): number {
  // Sort points in descending order
  const sortedPoints = [...allUsersPoints].sort((a, b) => b - a);
  
  // Find user's rank
  const rank = sortedPoints.findIndex(points => points <= userPoints) + 1;
  
  // Calculate percentile (higher is better)
  return 100 - (rank / sortedPoints.length) * 100;
}

/**
 * Determine if user is eligible for top performer reward
 */
export function isTopPerformer(percentile: number): boolean {
  return percentile >= 90; // Top 10%
}

/**
 * Select random users for random reward distribution (10% of users)
 */
export function selectRandomUsers(userIds: string[]): string[] {
  const shuffled = [...userIds].sort(() => 0.5 - Math.random());
  const selectCount = Math.ceil(userIds.length * 0.1); // 10% of users
  return shuffled.slice(0, selectCount);
}

/**
 * Calculate revenue distribution for a user
 */
export function calculateRevenueShare(totalRevenue: number, eligibleUserCount: number): number {
  // 50% of revenue split among eligible users
  const revenuePool = totalRevenue * 0.5;
  return revenuePool / eligibleUserCount;
}

/**
 * Reset monthly points at the beginning of a new month
 */
export function resetMonthlyPoints(userPoints: UserPoints): UserPoints {
  return {
    ...userPoints,
    thisMonth: 0,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Add a reward to user's history
 */
export function addReward(
  userPoints: UserPoints, 
  amount: number, 
  type: 'top_performer' | 'random_selection'
): UserPoints {
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth()).padStart(2, '0')}`; // Previous month
  
  const newReward = {
    id: Math.random().toString(36).substring(2, 15),
    month,
    amount,
    type,
    distributionDate: now.toISOString(),
  };
  
  return {
    ...userPoints,
    rewards: [newReward, ...userPoints.rewards],
  };
}

/**
 * Deduct points from a user (for purchases/offers)
 */
export function deductPoints(
  userPoints: UserPoints,
  amount: number,
  description: string
): UserPoints | null {
  // Check if user has enough points
  if (userPoints.total < amount) {
    return null; // Not enough points
  }
  
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  
  const activity: PointActivity = {
    id: Math.random().toString(36).substring(2, 15),
    type: 'other',
    points: -amount, // Negative amount for deduction
    description,
    timestamp: now.toISOString(),
  };
  
  // Update monthly points
  let monthlyPoints = userPoints.thisMonth - amount;
  if (monthlyPoints < 0) monthlyPoints = 0; // Don't go negative for the month
  
  let monthlyHistory = [...userPoints.history];
  const existingMonthIndex = monthlyHistory.findIndex(h => h.month === currentMonth);
  if (existingMonthIndex >= 0) {
    monthlyHistory[existingMonthIndex].points -= amount;
    // Don't let monthly history go negative
    if (monthlyHistory[existingMonthIndex].points < 0) {
      monthlyHistory[existingMonthIndex].points = 0;
    }
  }
  
  return {
    ...userPoints,
    total: userPoints.total - amount,
    thisMonth: monthlyPoints,
    lastUpdated: now.toISOString(),
    history: monthlyHistory,
    activities: [activity, ...userPoints.activities.slice(0, 99)], // Keep last 100 activities
  };
}