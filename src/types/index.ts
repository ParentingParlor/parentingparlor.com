export interface SearchResult {
  slug: string;
  title: string;
  author: {
    name: string;
    location: string;
  };
  tags: string[];
}

export interface Topic {
  slug: string;
  title: string;
  author: {
    name: string;
    location: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
    isVerified?: boolean;
    verifiedDate?: string;
  };
  content: string;
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  views: number;
  weeklyViews: number;
  score: number;
  imageUrl?: string;
  communityResponses: number;
  comments?: Comment[];
  attachedLists?: UserList[];
}

export interface Comment {
  id: string;
  author: string;
  authorIsVerified?: boolean;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
  attachedLists?: UserList[];
  highlighted?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  isPublic: boolean;
}

export interface UserProfile {
  displayName: string;
  isHumanVerified: boolean;
  badges: Badge[];
  children: Child[];
  joinDate: string;
}

export interface UserPoints {
  total: number;
  thisMonth: number;
  lastUpdated: string;
  history: PointsHistory[];
  activities: PointActivity[];
  rank?: {
    overall: number;
    percentile: number;
    isTopTenPercent: boolean;
  };
  rewards: RewardHistory[];
}

export interface PointsHistory {
  month: string; // Format: YYYY-MM
  points: number;
}

export interface PointActivity {
  id: string;
  type: 'login' | 'view' | 'comment' | 'post' | 'invite' | 'other';
  points: number;
  description: string;
  timestamp: string;
}

export interface RewardHistory {
  id: string;
  month: string; // Format: YYYY-MM
  amount: number;
  type: 'top_performer' | 'random_selection';
  distributionDate: string;
}

export interface UserList {
  id: string;
  title: string;
  description?: string;
  type: 'products' | 'baby-names' | 'books' | 'streaming' | 'custom';
  privacy: 'private' | 'friends' | 'public';
  items: ListItem[];
  babyNames?: BabyName[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
  publications?: ListPublication[];
  author?: ListAuthor;
  saves?: number;
}

export interface ListItem {
  id: string;
  title: string;
  description?: string;
  url?: string;
  price?: number;
  priority?: 'low' | 'medium' | 'high';
  status?: 'have' | 'want' | 'recommend';
  rating?: number;
  review?: string;
  ageRange?: string;
  platform?: string;
  notes?: string;
  addedAt: string;
}

export interface BabyName {
  id: string;
  name: string;
  meaning: string;
  origin: string;
  gender: 'male' | 'female' | 'unisex';
  popularity?: number;
  pronunciation?: string;
  favorite: boolean;
  length: number;
  nickname?: string;
  nicknameLength?: number;
  rank?: number;
  yearRank?: { [key: string]: number };
  syllables: number;
}

export interface ListAuthor {
  name: string;
  avatar: string;
}

export interface ListPublication {
  id: string;
  topicId: string;
  commentId?: string;
  title: string;
}

// Partner and Product types
export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  joinedDate: string;
  categories: string[];
  isVerified: boolean;
  contactEmail: string;
  contactPhone?: string;
  socialMedia?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface Product {
  id: string;
  partnerId: string;
  partnerName: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  currency: string;
  images: string[];
  categories: string[];
  tags: string[];
  ageRange?: string;
  features: string[];
  specs?: Record<string, string>;
  inventory?: number;
  releaseDate: string;
  lastUpdated: string;
  rating: {
    average: number;
    count: number;
  };
  status: 'active' | 'discontinued' | 'coming_soon';
}

export interface ProductReview {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  isVerifiedPurchase: boolean;
  rating: number;
  title: string;
  content: string;
  pros?: string[];
  cons?: string[];
  helpfulVotes: number;
  createdAt: string;
  updatedAt: string;
  childAge?: string;
  images?: string[];
  reportedCount?: number;
  isHighlighted?: boolean;
  isEdited?: boolean;
}

export interface PartnerOffer {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerLogo: string;
  title: string;
  description: string;
  image?: string;
  pointsCost: number;
  originalValue?: number;
  type: 'discount' | 'product' | 'service' | 'giveaway' | 'experience';
  status: 'active' | 'ended' | 'coming_soon';
  startDate: string;
  endDate: string;
  totalQuantity?: number;
  remainingQuantity?: number;
  redeemInstructions: string;
  termsAndConditions: string;
  isSponsored?: boolean;
  targetAudience?: string[];
  priority?: number; // Higher number = higher priority in display
}

export interface Claim {
  id: string;
  offerId: string;
  userId: string;
  pointsSpent: number;
  claimDate: string;
  status: 'pending' | 'approved' | 'redeemed' | 'expired' | 'declined';
  redeemCode?: string;
  redeemDate?: string;
  expiryDate?: string;
  feedback?: {
    rating?: number;
    comment?: string;
    submittedAt?: string;
  };
}