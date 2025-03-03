import { relations } from "drizzle-orm";
import { integer, pgTable, text, boolean, date, foreignKey, primaryKey } from "drizzle-orm/pg-core";

const base = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: date().notNull().default('now()'),
  updatedAt: date().notNull().default('now()'),
}

const userBase = {
  ...base,
  userId: integer()
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
}

const userPostBase = {
  ...userBase,
  postId: integer()
    .references(() => posts.id, { onDelete: 'cascade' })
    .notNull(),
}

const pointsFields = {
  points: integer().notNull(),
  pointsDisabled: boolean().notNull().default(false),
}

const userPointsBase = {
  ...userBase,
  ...pointsFields,
}

const userPostPointsBase = {
  ...userPostBase,
  ...pointsFields
}

export const comments = pgTable(
  "comments",
  {
    ...userPostBase,
    content: text().notNull(),
    parentCommentId: integer(),
  },
  (table) => [
    foreignKey({
      columns: [table.parentCommentId],
      foreignColumns: [table.id],
    })
  ]
);
export const commentsRelations = relations(comments, (helpers) => {
  const postRelation = helpers.one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  })
  const commentLikesRelation = helpers.many(commentLikes)
  const userRelation = helpers.one(users, {
    fields: [comments.userId],
    references: [users.id],
  })
  const relations = {
    post: postRelation,
    user: userRelation,
    commentLikes: commentLikesRelation,
  }
  return relations
});

export const commentLikes = pgTable('commentLikes', {
  ...userBase,
  commentId: integer()
    .references(() => comments.id, { onDelete: 'cascade' })
    .notNull(),
});
export const commentLikesRelations = relations(commentLikes, (helpers) => {
  const commentRelation = helpers.one(comments, {
    fields: [commentLikes.commentId],
    references: [comments.id],
  })
  const userRelation = helpers.one(users, {
    fields: [commentLikes.userId],
    references: [users.id],
  })
  const relations = {
    comment: commentRelation,
    user: userRelation,
  }
  return relations
});

export const invites = pgTable('invites', {
  ...base,
  accepted: boolean().notNull().default(false),
  acceptorId: integer().references(() => users.id, { onDelete: 'cascade' }),
  code: text().notNull(),
  email: text().notNull(),
  senderId: integer()
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});
export const invitesRelations = relations(invites, (helpers) => {
  const acceptorRelation = helpers.one(users, {
    fields: [invites.acceptorId],
    references: [users.id],
  })
  const senderRelation = helpers.one(users, {
    fields: [invites.senderId],
    references: [users.id],
  })
  const relations = {
    acceptor: acceptorRelation,
    sender: senderRelation,
  }
  return relations
});

export const lists = pgTable('lists', {
  ...userBase,
  title: text().notNull(),
  description: text('description'),
  public: boolean().notNull().default(false),
});
export const listsRelations = relations(lists, (helpers) => {
  const listItemsRelation = helpers.many(listItems)
  const postListsRelations = helpers.many(postLists)
  const userRelation = helpers.one(users, {
    fields: [lists.userId],
    references: [users.id],
  })
  const relations = {
    listItems: listItemsRelation,
    postListsRelations,
    user: userRelation,
  }
  return relations
});

export const listItems = pgTable('list_items', {
  ...base,
  listId: integer()
    .references(() => lists.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  description: text('description'),
});
export const listItemsRelations = relations(listItems, (helpers) => {
  const listRelation = helpers.one(lists, {
    fields: [listItems.listId],
    references: [lists.id],
  })
  const relations = { list: listRelation }
  return relations
});

export const posts = pgTable('posts', {
  ...userBase,
  content: text().notNull(),
  slug: text('slug').notNull().unique(),
  topicId: integer()
    .references(() => topics.id, { onDelete: 'cascade' })
    .notNull(),
  title: text().notNull(),
})
export const postsRelations = relations(posts, (helpers) => {
  const commentsRelation = helpers.many(comments)
  const postListsRelations = helpers.many(postLists)
  const topicRelation = helpers.one(topics, {
    fields: [posts.topicId],
    references: [topics.id],
  })
  const userRelation = helpers.one(users, {
    fields: [posts.userId],
    references: [users.id],
  })
  const userViewsRelation = helpers.many(userViews)
  const relations = {
    comments: commentsRelation,
    postLists: postListsRelations,
    topic: topicRelation,
    user: userRelation,
    userViews: userViewsRelation,
  }
  return relations
});

export const postLikes = pgTable('postLikes', {
  ...userPostBase,
})
export const postLikesRelations = relations(postLikes, (helpers) => {
  const postRelation = helpers.one(posts, {
    fields: [postLikes.postId],
    references: [posts.id],
  })
  const userRelation = helpers.one(users, {
    fields: [postLikes.userId],
    references: [users.id],
  })
  const relations = {
    post: postRelation,
    user: userRelation,
  }
  return relations
});
export const users = pgTable('users', {
  ...base,
  email: text().notNull().unique(),
  displayName: text().notNull(),
  verified: boolean().notNull().default(false),
  totalPoints: integer('total_points').notNull().default(0),
  monthlyPoints: integer('monthly_points').notNull().default(0),
});

export const postLists = pgTable(
  'postLists',
  {
    listId: integer()
      .notNull()
      .references(() => lists.id),
    postId: integer()
      .notNull()
      .references(() => posts.id),
  },
  (t) => [
		primaryKey({ columns: [t.listId, t.postId] })
	],
);
export const postListsRelations = relations(postLists, ({ one }) => ({
  list: one(lists, {
    fields: [postLists.listId],
    references: [lists.id],
  }),
  post: one(posts, {
    fields: [postLists.postId],
    references: [posts.id],
  }),
}));

export const usersRelations = relations(users, (helpers) => {
  const commentsRelation = helpers.many(comments)
  const commentLikesRelation = helpers.many(commentLikes)
  const invitesRelation = helpers.many(invites)
  const listsRelation = helpers.many(lists)
  const pointRewardsRelation = helpers.many(pointRewards)
  const postsRelation = helpers.many(posts)
  const postLikesRelation = helpers.many(postLikes)
  const userCommentsRelation = helpers.many(userComments)
  const userCommentLikesRelation = helpers.many(userCommentLikes)
  const userInvitesRelation = helpers.many(userInvites)
  const userLoginsRelation = helpers.many(userLogins)
  const userPostsRelation = helpers.many(userPosts)
  const userPostLikesRelation = helpers.many(userPostLikes)
  const userViewsRelation = helpers.many(userViews)
  const relations = {
    comments: commentsRelation,
    commentLikes: commentLikesRelation,
    invites: invitesRelation,
    lists: listsRelation,
    pointRewards: pointRewardsRelation,
    posts: postsRelation,
    postLikes: postLikesRelation,
    userComments: userCommentsRelation,
    userCommentLikes: userCommentLikesRelation,
    userInvites: userInvitesRelation,
    userLogins: userLoginsRelation,
    userPosts: userPostsRelation,
    userPostLikes: userPostLikesRelation,
    userViews: userViewsRelation,
  }
  return relations;
});

export const userComments = pgTable('userComments', {
  ...userPointsBase,
  commentId: integer()
    .references(() => comments.id, { onDelete: 'cascade' })
    .notNull(),
})
export const userCommentsRelations = relations(userComments, (helpers) => {
  const commentRelation = helpers.one(comments, {
    fields: [userComments.commentId],
    references: [comments.id],
  })
  const userRelation = helpers.one(users, {
    fields: [userComments.userId],
    references: [users.id],
  })
  const relations = {
    comment: commentRelation,
    user: userRelation,
  }
  return relations
});

export const userCommentLikes = pgTable('userCommentLikes', {
  ...userPointsBase,
  commentLikeId: integer()
    .references(() => commentLikes.id, { onDelete: 'cascade' })
    .notNull(),
})
export const userCommentLikesRelations = relations(userCommentLikes, (helpers) => {
  const commentLikeRelation = helpers.one(commentLikes, {
    fields: [userCommentLikes.commentLikeId],
    references: [commentLikes.id],
  })
  const userRelation = helpers.one(users, {
    fields: [userCommentLikes.userId],
    references: [users.id],
  })
  const relations = {
    commentLike: commentLikeRelation,
    user: userRelation,
  }
  return relations
});

export const userInvites = pgTable('userInvites', {
  ...userPointsBase,
  inviteId: integer()
    .references(() => invites.id, { onDelete: 'cascade' })
    .notNull(),
})
export const userInvitesRelations = relations(userInvites, (helpers) => {
  const inviteRelation = helpers.one(invites, {
    fields: [userInvites.inviteId],
    references: [invites.id],
  })
  const userRelation = helpers.one(users, {
    fields: [userInvites.userId],
    references: [users.id],
  })
  const relations = {
    invite: inviteRelation,
    user: userRelation,
  }
  return relations
});

export const userLogins = pgTable('userLogins', {
  ...userPointsBase,
})
export const userLoginsRelations = relations(userLogins, (helpers) => {
  const userRelation = helpers.one(users, {
    fields: [userLogins.userId],
    references: [users.id],
  })
  const relations = { user: userRelation }
  return relations
});

export const userPosts = pgTable('userPosts', {
  ...userPostPointsBase,
})
export const userPostsRelations = relations(userPosts, (helpers) => {
  const postRelation = helpers.one(posts, {
    fields: [userPosts.postId],
    references: [posts.id],
  })
  const userRelation = helpers.one(users, {
    fields: [userPosts.userId],
    references: [users.id],
  })
  const relations = {
    post: postRelation,
    user: userRelation,
  }
  return relations
});

export const userPostLikes = pgTable('userPostLikes', {
  ...userPointsBase,
  postLikeId: integer()
    .references(() => postLikes.id, { onDelete: 'cascade' })
    .notNull(),
})
export const userPostLikesRelations = relations(userPostLikes, (helpers) => {
  const postLikeRelation = helpers.one(postLikes, {
    fields: [userPostLikes.postLikeId],
    references: [postLikes.id],
  })
  const userRelation = helpers.one(users, {
    fields: [userPostLikes.userId],
    references: [users.id],
  })
  const relations = {
    postLike: postLikeRelation,
    user: userRelation,
  }
  return relations
})

export const userViews = pgTable('userViews', {
  ...userPostPointsBase,
})
export const userViewsRelations = relations(userViews, (helpers) => {
  const postRelation = helpers.one(posts, {
    fields: [userViews.postId],
    references: [posts.id],
  })
  const userRelation = helpers.one(users, {
    fields: [userViews.userId],
    references: [users.id],
  })
  const relations = {
    post: postRelation,
    user: userRelation,
  }
  return relations
});

export const pointRewards = pgTable('pointRewards', {
  ...userBase,
  amount: integer().notNull(),
  description: text().notNull(),
});
export const pointRewardsRelations = relations(pointRewards, (helpers) => {
  const userRelation = helpers.one(users, {
    fields: [pointRewards.userId],
    references: [users.id],
  })
  const relations = { user: userRelation }
  return relations
});

export const topics = pgTable('topics', {
  ...base,
  label: text().notNull(),
  slug: text().notNull().unique(),
});
export const topicsRelations = relations(topics, (helpers) => {
  const postsRelation = helpers.many(posts)
  const relations = { posts: postsRelation }
  return relations
});

// // Track where lists are published
// export const listPublications = sqliteTable('list_publications', {
//   id: text('id').primaryKey(),
//   listId: text('list_id').references(() => lists.id),
//   topicId: text('topic_id').references(() => topics.id),
//   commentId: text('comment_id').references(() => comments.id),
//   createdAt: text('created_at').notNull(),
// });

// export const tags = sqliteTable('tags', {
//   id: text('id').primaryKey(),
//   name: text('name').notNull().unique(),
//   category: text('category').notNull(),
//   color: text('color').notNull(),
// });

// export const topicTags = sqliteTable('topic_tags', {
//   topicId: text('topic_id').references(() => topics.id),
//   tagId: text('tag_id').references(() => tags.id),
// });

// export const badges = sqliteTable('badges', {
//   id: text('id').primaryKey(),
//   name: text('name').notNull().unique(),
//   description: text('description').notNull(),
//   icon: text('icon').notNull(),
//   color: text('color').notNull(),
// });

// export const userBadges = sqliteTable('user_badges', {
//   userId: text('user_id').references(() => users.id),
//   badgeId: text('badge_id').references(() => badges.id),
//   awardedAt: text('awarded_at').notNull(),
// });

// // Partner companies and products schema
// export const partners = sqliteTable('partners', {
//   id: text('id').primaryKey(),
//   name: text('name').notNull(),
//   slug: text('slug').notNull().unique(),
//   logo: text('logo').notNull(),
//   description: text('description').notNull(),
//   website: text('website').notNull(),
//   contactEmail: text('contact_email').notNull(),
//   contactPhone: text('contact_phone'),
//   isVerified: integer('is_verified', { mode: 'boolean' }).notNull().default(false),
//   joinedDate: text('joined_date').notNull(),
//   categories: text('categories').notNull(), // JSON array
//   status: text('status').notNull().default('active'), // active, suspended, pending
// });

// export const products = sqliteTable('products', {
//   id: text('id').primaryKey(),
//   partnerId: text('partner_id').references(() => partners.id).notNull(),
//   name: text('name').notNull(),
//   slug: text('slug').notNull().unique(),
//   description: text('description').notNull(),
//   shortDescription: text('short_description').notNull(),
//   price: integer('price').notNull(),
//   salePrice: integer('sale_price'),
//   currency: text('currency').notNull().default('USD'),
//   images: text('images').notNull(), // JSON array
//   categories: text('categories').notNull(), // JSON array
//   tags: text('tags').notNull(), // JSON array
//   ageRange: text('age_range'),
//   features: text('features').notNull(), // JSON array
//   specs: text('specs'), // JSON object
//   inventory: integer('inventory'),
//   releaseDate: text('release_date').notNull(),
//   lastUpdated: text('last_updated').notNull(),
//   ratingAvg: integer('rating_avg').notNull().default(0),
//   ratingCount: integer('rating_count').notNull().default(0),
//   status: text('status').notNull().default('active'), // active, discontinued, coming_soon
// });

// export const productReviews = sqliteTable('product_reviews', {
//   id: text('id').primaryKey(),
//   productId: text('product_id').references(() => products.id).notNull(),
//   userId: text('user_id').references(() => users.id).notNull(),
//   isVerifiedPurchase: integer('is_verified_purchase', { mode: 'boolean' }).notNull().default(false),
//   rating: integer('rating').notNull(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   pros: text('pros'), // JSON array
//   cons: text('cons'), // JSON array
//   helpfulVotes: integer('helpful_votes').notNull().default(0),
//   createdAt: text('created_at').notNull(),
//   updatedAt: text('updated_at').notNull(),
//   childAge: text('child_age'),
//   images: text('images'), // JSON array
//   reportedCount: integer('reported_count').notNull().default(0),
//   isHighlighted: integer('is_highlighted', { mode: 'boolean' }).notNull().default(false),
//   isEdited: integer('is_edited', { mode: 'boolean' }).notNull().default(false),
// });

// export const partnerOffers = sqliteTable('partner_offers', {
//   id: text('id').primaryKey(),
//   partnerId: text('partner_id').references(() => partners.id).notNull(),
//   title: text('title').notNull(),
//   description: text('description').notNull(),
//   image: text('image'),
//   pointsCost: integer('points_cost').notNull(),
//   originalValue: integer('original_value'),
//   type: text('type').notNull(), // discount, product, service, giveaway, experience
//   status: text('status').notNull(), // active, ended, coming_soon
//   startDate: text('start_date').notNull(),
//   endDate: text('end_date').notNull(),
//   totalQuantity: integer('total_quantity'),
//   remainingQuantity: integer('remaining_quantity'),
//   redeemInstructions: text('redeem_instructions').notNull(),
//   termsAndConditions: text('terms_and_conditions').notNull(),
//   isSponsored: integer('is_sponsored', { mode: 'boolean' }).notNull().default(false),
//   targetAudience: text('target_audience'), // JSON array
//   priority: integer('priority').notNull().default(0),
// });

// export const claims = sqliteTable('claims', {
//   id: text('id').primaryKey(),
//   offerId: text('offer_id').references(() => partnerOffers.id).notNull(),
//   userId: text('user_id').references(() => users.id).notNull(),
//   pointsSpent: integer('points_spent').notNull(),
//   claimDate: text('claim_date').notNull(),
//   status: text('status').notNull(), // pending, approved, redeemed, expired, declined
//   redeemCode: text('redeem_code'),
//   redeemDate: text('redeem_date'),
//   expiryDate: text('expiry_date'),
//   feedbackRating: integer('feedback_rating'),
//   feedbackComment: text('feedback_comment'),
//   feedbackDate: text('feedback_date'),
// });