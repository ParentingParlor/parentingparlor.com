import { FeaturePost } from '@/types/feature-post';

export const featuredPosts: FeaturePost[] = [
  {
    id: 'reluctant-products',
    type: 'product-recommendations',
    title: "What product did you reluctantly buy at first, but now suggest to every parent?",
    slug: 'reluctant-products',
    description: "Share the products that surprised you with their usefulness and have become your must-recommend items for other parents.",
    content: `We've all been there - that moment when another parent suggests a product that seems unnecessary or overpriced. But then you try it, and it becomes an absolute game-changer in your parenting journey.

Share your experience with products that you were initially skeptical about but now can't imagine parenting without. Your insights could help other parents make informed decisions about their purchases.

When sharing your recommendation, please include:
- The product name and where to find it
- Why you were initially reluctant
- What changed your mind
- Why you now recommend it to others`,
    recommendations: [],
    stats: {
      totalContributors: 238,
      totalProducts: 412,
      averagePrice: 45.99,
      topCategories: [
        { name: 'Sleep & Comfort', count: 86 },
        { name: 'Feeding', count: 74 },
        { name: 'Travel & Safety', count: 52 },
        { name: 'Toys & Learning', count: 48 },
        { name: 'Hygiene & Care', count: 42 }
      ],
      priceRanges: [
        { range: '$0-$25', count: 98 },
        { range: '$26-$50', count: 156 },
        { range: '$51-$100', count: 108 },
        { range: '$101+', count: 50 }
      ]
    },
    comments: [],
    attachedLists: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // Add other featured posts here...
];