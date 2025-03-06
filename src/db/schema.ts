import {
  relations,
} from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  boolean,
  date,
  foreignKey,
  primaryKey,
} from "drizzle-orm/pg-core";

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

export const badges = pgTable('badges', {
  ...base,
  name: text().notNull().unique(),
  description: text().notNull(),
  icon: text().notNull(),
  color: text().notNull(),
});
export const badgesRelations = relations(badges, (helpers) => {
  const userBadgesRelation = helpers.many(userBadges)
  const relations = { userBadges: userBadgesRelation }
  return relations
});

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
  const relations = {
    commentLikes: helpers.many(commentLikes),
    eventComments: helpers.many(eventComments),
    post: helpers.one(posts, {
      fields: [comments.postId],
      references: [posts.id],
    }),
    user: helpers.one(users, {
      fields: [comments.userId],
      references: [users.id],
    }),
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
  const relations = {
    comment: helpers.one(comments, {
      fields: [commentLikes.commentId],
      references: [comments.id],
    }),
    eventCommentLikes: helpers.many(eventCommentLikes),
    user: helpers.one(users, {
      fields: [commentLikes.userId],
      references: [users.id],
    }),
  }
  return relations
});

export const eventComments = pgTable('eventComments', {
  ...userPointsBase,
  commentId: integer()
    .references(() => comments.id, { onDelete: 'cascade' })
    .notNull(),
})
export const eventCommentsRelations = relations(eventComments, (helpers) => {
  const relations = {
    comment: helpers.one(comments, {
      fields: [eventComments.commentId],
      references: [comments.id],
    }),
    user: helpers.one(users, {
      fields: [eventComments.userId],
      references: [users.id],
    }),
  }
  return relations
});

export const eventCommentLikes = pgTable('eventCommentLikes', {
  ...userPointsBase,
  commentLikeId: integer()
    .references(() => commentLikes.id, { onDelete: 'cascade' })
    .notNull(),
})
export const eventCommentLikesRelations = relations(eventCommentLikes, (helpers) => {
  const relations = {
    commentLike: helpers.one(commentLikes, {
      fields: [eventCommentLikes.commentLikeId],
      references: [commentLikes.id],
    }),
    user: helpers.one(users, {
      fields: [eventCommentLikes.userId],
      references: [users.id],
    }),
  }
  return relations
});

export const eventInvites = pgTable('eventInvites', {
  ...userPointsBase,
  inviteId: integer()
    .references(() => invites.id, { onDelete: 'cascade' })
    .notNull(),
})
export const eventInvitesRelations = relations(eventInvites, (helpers) => {
  const relations = {
    invite: helpers.one(invites, {
      fields: [eventInvites.inviteId],
      references: [invites.id],
    }),
    user: helpers.one(users, {
      fields: [eventInvites.userId],
      references: [users.id],
    }),
  }
  return relations
});

export const eventLogins = pgTable('eventLogins', {
  ...userPointsBase,
})
export const eventLoginsRelations = relations(eventLogins, (helpers) => {
  const userRelation = helpers.one(users, {
    fields: [eventLogins.userId],
    references: [users.id],
  })
  const relations = { user: userRelation }
  return relations
});

export const eventPosts = pgTable('eventPosts', {
  ...userPostPointsBase,
})
export const eventPostsRelations = relations(eventPosts, (helpers) => {
  const postRelation = helpers.one(posts, {
    fields: [eventPosts.postId],
    references: [posts.id],
  })
  const userRelation = helpers.one(users, {
    fields: [eventPosts.userId],
    references: [users.id],
  })
  const relations = {
    post: postRelation,
    user: userRelation,
  }
  return relations
});

export const eventPostLikes = pgTable('eventPostLikes', {
  ...userPointsBase,
  postLikeId: integer()
    .references(() => postLikes.id, { onDelete: 'cascade' })
    .notNull(),
})
export const eventPostLikesRelations = relations(eventPostLikes, (helpers) => {
  const postLikeRelation = helpers.one(postLikes, {
    fields: [eventPostLikes.postLikeId],
    references: [postLikes.id],
  })
  const userRelation = helpers.one(users, {
    fields: [eventPostLikes.userId],
    references: [users.id],
  })
  const relations = {
    postLike: postLikeRelation,
    user: userRelation,
  }
  return relations
})

export const eventViews = pgTable('eventViews', {
  ...userPostPointsBase,
})
export const eventViewsRelations = relations(eventViews, (helpers) => {
  const postRelation = helpers.one(posts, {
    fields: [eventViews.postId],
    references: [posts.id],
  })
  const userRelation = helpers.one(users, {
    fields: [eventViews.userId],
    references: [users.id],
  })
  const relations = {
    post: postRelation,
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
  const relations = {
    eventInvites: helpers.many(eventInvites),
    recipient: helpers.one(users, {
      fields: [invites.acceptorId],
      references: [users.id],
    }),
    sender: helpers.one(users, {
      fields: [invites.senderId],
      references: [users.id],
    }),
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

export const listItems = pgTable('listItems', {
  ...base,
  listId: integer()
    .references(() => lists.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
});
export const listItemsRelations = relations(listItems, (helpers) => {
  const listRelation = helpers.one(lists, {
    fields: [listItems.listId],
    references: [lists.id],
  })
  const relations = { list: listRelation }
  return relations
});

export const rewards = pgTable('rewards', {
  ...userBase,
  points: integer().notNull(),
  description: text().notNull(),
});
export const rewardsRelations = relations(rewards, (helpers) => {
  const userRelation = helpers.one(users, {
    fields: [rewards.userId],
    references: [users.id],
  })
  const relations = { user: userRelation }
  return relations
});

export const posts = pgTable('posts', {
  ...userBase,
  content: text().notNull(),
  slug: text('slug').notNull().unique(),
  title: text().notNull(),
})
export const postsRelations = relations(posts, (helpers) => {
  const relations = {
    comments: helpers.many(comments),
    postLists: helpers.many(postLists),
    user: helpers.one(users, {
      fields: [posts.userId],
      references: [users.id],
    }),
    eventPosts: helpers.many(eventPosts),
    eventViews: helpers.many(eventViews),
  }
  return relations
});

export const postLikes = pgTable('postLikes', {
  ...userPostBase,
})
export const postLikesRelations = relations(postLikes, (helpers) => {
  const relations = {
    eventPostLikes: helpers.many(eventPostLikes),
    post: helpers.one(posts, {
      fields: [postLikes.postId],
      references: [posts.id],
    }),
    user: helpers.one(users, {
      fields: [postLikes.userId],
      references: [users.id],
    }),
  }
  return relations
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
export const postListsRelations = relations(postLists, (helpers) => {
  return {
    eventPostLikes: helpers.many(eventPostLikes),
    list: helpers.one(lists, {
      fields: [postLists.listId],
      references: [lists.id],
    }),
    post: helpers.one(posts, {
      fields: [postLists.postId],
      references: [posts.id],
    })
  }
});

export const postTags = pgTable(
  'postTags',
  {
    postId: integer()
      .notNull()
      .references(() => posts.id),
    tagId: integer()
      .notNull()
      .references(() => tags.id),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] })
  ],
);
export const postTagsRelations = relations(postTags, (helpers) => {
  return {
    post: helpers.one(posts, {
      fields: [postTags.postId],
      references: [posts.id],
    }),
    tag: helpers.one(tags, {
      fields: [postTags.tagId],
      references: [tags.id],
    }),
  }
});

export const tags = pgTable('tagsRewards', {
  ...base,
  name: text().notNull().unique(),
})

export const users = pgTable('users', {
  ...base,
  email: text().notNull().unique(),
  displayName: text().notNull(),
  verified: boolean().notNull().default(false),
  points: integer().notNull().default(0),
  monthlyPoints: integer().notNull().default(0),
});
export const usersRelations = relations(users, (helpers) => {
  const relations = {
    userBadges: helpers.many(userBadges),
    comments: helpers.many(comments),
    commentLikes: helpers.many(commentLikes),
    eventComments: helpers.many(eventComments),
    eventCommentLikes: helpers.many(eventCommentLikes),
    eventInvites: helpers.many(eventInvites),
    eventLogins: helpers.many(eventLogins),
    eventPosts: helpers.many(eventPosts),
    eventPostLikes: helpers.many(eventPostLikes),
    eventViews: helpers.many(eventViews),
    invites: helpers.many(invites),
    lists: helpers.many(lists),
    pointRewards: helpers.many(rewards),
    posts: helpers.many(posts),
    postLikes: helpers.many(postLikes),
  }
  return relations;
});

export const userBadges = pgTable('userBadges', {
  ...userBase,
  badgeId: integer()
    .references(() => badges.id, { onDelete: 'cascade' })
    .notNull(),
})
export const userBadgesRelations = relations(userBadges, (helpers) => {
  const relations = {
    badge: helpers.one(badges, {
      fields: [userBadges.badgeId],
      references: [badges.id],
    }),
    user: helpers.one(users, {
      fields: [userBadges.userId],
      references: [users.id],
    }),
  }
  return relations
});
