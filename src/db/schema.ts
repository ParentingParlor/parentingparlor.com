import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  displayName: text('display_name').notNull(),
  isHumanVerified: integer('is_human_verified', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('created_at').notNull(),
});

export const userPoints = sqliteTable('user_points', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  totalPoints: integer('total_points').notNull().default(0),
  monthlyPoints: integer('monthly_points').notNull().default(0),
  lastUpdated: text('last_updated').notNull(),
});

export const pointActivities = sqliteTable('point_activities', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  type: text('type').notNull(), // login, view, comment, post, invite
  points: integer('points').notNull(),
  description: text('description').notNull(),
  timestamp: text('timestamp').notNull(),
});

export const pointRewards = sqliteTable('point_rewards', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  month: text('month').notNull(), // YYYY-MM format
  amount: integer('amount').notNull(),
  type: text('type').notNull(), // top_performer or random_selection
  distributionDate: text('distribution_date').notNull(),
});

export const topics = sqliteTable('topics', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  authorId: text('author_id').references(() => users.id),
  likes: integer('likes').notNull().default(0),
  responses: integer('responses').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  topicId: text('topic_id').references(() => topics.id),
  authorId: text('author_id').references(() => users.id),
  content: text('content').notNull(),
  parentId: text('parent_id').references(() => comments.id),
  likes: integer('likes').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

export const lists = sqliteTable('lists', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  type: text('type').notNull(),
  privacy: text('privacy').notNull(),
  authorId: text('author_id').references(() => users.id),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

// Track where lists are published
export const listPublications = sqliteTable('list_publications', {
  id: text('id').primaryKey(),
  listId: text('list_id').references(() => lists.id),
  topicId: text('topic_id').references(() => topics.id),
  commentId: text('comment_id').references(() => comments.id),
  createdAt: text('created_at').notNull(),
});

export const listItems = sqliteTable('list_items', {
  id: text('id').primaryKey(),
  listId: text('list_id').references(() => lists.id),
  title: text('title').notNull(),
  description: text('description'),
  url: text('url'),
  price: integer('price'),
  priority: text('priority'),
  status: text('status'),
  rating: integer('rating'),
  review: text('review'),
  ageRange: text('age_range'),
  platform: text('platform'),
  notes: text('notes'),
  addedAt: text('added_at').notNull(),
});

export const tags = sqliteTable('tags', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  category: text('category').notNull(),
  color: text('color').notNull(),
});

export const topicTags = sqliteTable('topic_tags', {
  topicId: text('topic_id').references(() => topics.id),
  tagId: text('tag_id').references(() => tags.id),
});

export const badges = sqliteTable('badges', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
});

export const userBadges = sqliteTable('user_badges', {
  userId: text('user_id').references(() => users.id),
  badgeId: text('badge_id').references(() => badges.id),
  awardedAt: text('awarded_at').notNull(),
});

export const invites = sqliteTable('invites', {
  id: text('id').primaryKey(),
  inviterId: text('inviter_id').references(() => users.id),
  email: text('email').notNull(),
  status: text('status').notNull(), // sent, accepted, expired
  code: text('code').notNull(),
  sentAt: text('sent_at').notNull(),
  acceptedAt: text('accepted_at'),
});

// Partner companies and products schema
export const partners = sqliteTable('partners', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logo: text('logo').notNull(),
  description: text('description').notNull(),
  website: text('website').notNull(),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  isVerified: integer('is_verified', { mode: 'boolean' }).notNull().default(false),
  joinedDate: text('joined_date').notNull(),
  categories: text('categories').notNull(), // JSON array
  status: text('status').notNull().default('active'), // active, suspended, pending
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  partnerId: text('partner_id').references(() => partners.id).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  price: integer('price').notNull(),
  salePrice: integer('sale_price'),
  currency: text('currency').notNull().default('USD'),
  images: text('images').notNull(), // JSON array
  categories: text('categories').notNull(), // JSON array
  tags: text('tags').notNull(), // JSON array
  ageRange: text('age_range'),
  features: text('features').notNull(), // JSON array
  specs: text('specs'), // JSON object
  inventory: integer('inventory'),
  releaseDate: text('release_date').notNull(),
  lastUpdated: text('last_updated').notNull(),
  ratingAvg: integer('rating_avg').notNull().default(0),
  ratingCount: integer('rating_count').notNull().default(0),
  status: text('status').notNull().default('active'), // active, discontinued, coming_soon
});

export const productReviews = sqliteTable('product_reviews', {
  id: text('id').primaryKey(),
  productId: text('product_id').references(() => products.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  isVerifiedPurchase: integer('is_verified_purchase', { mode: 'boolean' }).notNull().default(false),
  rating: integer('rating').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  pros: text('pros'), // JSON array
  cons: text('cons'), // JSON array
  helpfulVotes: integer('helpful_votes').notNull().default(0),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
  childAge: text('child_age'),
  images: text('images'), // JSON array
  reportedCount: integer('reported_count').notNull().default(0),
  isHighlighted: integer('is_highlighted', { mode: 'boolean' }).notNull().default(false),
  isEdited: integer('is_edited', { mode: 'boolean' }).notNull().default(false),
});

export const partnerOffers = sqliteTable('partner_offers', {
  id: text('id').primaryKey(),
  partnerId: text('partner_id').references(() => partners.id).notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  image: text('image'),
  pointsCost: integer('points_cost').notNull(),
  originalValue: integer('original_value'),
  type: text('type').notNull(), // discount, product, service, giveaway, experience
  status: text('status').notNull(), // active, ended, coming_soon
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  totalQuantity: integer('total_quantity'),
  remainingQuantity: integer('remaining_quantity'),
  redeemInstructions: text('redeem_instructions').notNull(),
  termsAndConditions: text('terms_and_conditions').notNull(),
  isSponsored: integer('is_sponsored', { mode: 'boolean' }).notNull().default(false),
  targetAudience: text('target_audience'), // JSON array
  priority: integer('priority').notNull().default(0),
});

export const claims = sqliteTable('claims', {
  id: text('id').primaryKey(),
  offerId: text('offer_id').references(() => partnerOffers.id).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  pointsSpent: integer('points_spent').notNull(),
  claimDate: text('claim_date').notNull(),
  status: text('status').notNull(), // pending, approved, redeemed, expired, declined
  redeemCode: text('redeem_code'),
  redeemDate: text('redeem_date'),
  expiryDate: text('expiry_date'),
  feedbackRating: integer('feedback_rating'),
  feedbackComment: text('feedback_comment'),
  feedbackDate: text('feedback_date'),
});