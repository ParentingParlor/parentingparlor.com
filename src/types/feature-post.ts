import { Comment, UserList } from '@/types';

export interface ProductRecommendation {
  id: string;
  url: string;
  productName: string;
  price: number;
  imageUrl?: string;
  comment: string;
  additionalUrls: string[];
  userId: string;
  userName: string;
  timestamp: string;
  votes: number;
}

export interface FeaturePost {
  id: string;
  type: 'product-recommendations' | 'milestone-stories' | 'parenting-tips';
  title: string;
  slug: string;
  description: string;
  content: string;
  recommendations?: ProductRecommendation[];
  stats: {
    totalContributors: number;
    totalProducts: number;
    averagePrice: number;
    topCategories: { name: string; count: number }[];
    priceRanges: { range: string; count: number }[];
  };
  comments: Comment[];
  attachedLists: UserList[];
  createdAt: string;
  updatedAt: string;
}