export type ListPrivacy = 'private' | 'friends' | 'public';

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

// Add author type to UserList
interface ListAuthor {
  name: string;
  avatar: string;
}

export interface ListPublication {
  id: string;
  topicId: string;
  commentId?: string;
  title: string;
}

export interface UserList {
  id: string;
  title: string;
  description?: string;
  type: 'products' | 'baby-names' | 'books' | 'streaming' | 'custom';
  privacy: ListPrivacy;
  items: ListItem[];
  babyNames?: BabyName[];
  createdAt: string;
  updatedAt: string;
  tags: string[];
  publications?: ListPublication[];
  author?: ListAuthor;
  saves?: number;
}