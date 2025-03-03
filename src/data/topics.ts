import { Topic } from '@/types';
import { generateTopics } from './topicGenerator';

// Generate 50 random topics
export const topics: Topic[] = generateTopics(50);