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

export const badges = pgTable('badges', {
  ...base,
  name: text().notNull().unique(),
  description: text().notNull(),
  icon: text().notNull(),
  color: text().notNull(),
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

export const posts = pgTable('posts', {
  ...userBase,
  content: text().notNull(),
  slug: text('slug').notNull().unique(),
  title: text().notNull(),
})
export const postsRelations = relations(posts, (helpers) => {
  const commentsRelation = helpers.many(comments)
  const postListsRelations = helpers.many(postLists)
  const userRelation = helpers.one(users, {
    fields: [posts.userId],
    references: [users.id],
  })
  const userViewsRelation = helpers.many(userViews)
  const relations = {
    comments: commentsRelation,
    postLists: postListsRelations,
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
  const list = helpers.one(lists, {
    fields: [postLists.listId],
    references: [lists.id],
  })
  const post = helpers.one(posts, {
    fields: [postLists.postId],
    references: [posts.id],
  })
  return { list, post }
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
  totalPoints: integer('total_points').notNull().default(0),
  monthlyPoints: integer('monthly_points').notNull().default(0),
});
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

export const userBadges = pgTable('userBadges', {
  ...userBase,
  badgeId: integer()
    .references(() => badges.id, { onDelete: 'cascade' })
    .notNull(),
})
export const userBadgesRelations = relations(userBadges, (helpers) => {
  const badgeRelation = helpers.one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  })
  const userRelation = helpers.one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  })
  const relations = {
    badge: badgeRelation,
    user: userRelation,
  }
  return relations
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
