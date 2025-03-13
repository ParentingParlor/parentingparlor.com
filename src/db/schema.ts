import { Db } from "@/feature/db/dbTypes";
import {
  relations,
  sql,
} from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  boolean,
  date,
  foreignKey,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";

const base = {
  id: text().primaryKey().default(sql`gen_random_uuid()`),
  createdAt: date().notNull().default('now()'),
  updatedAt: date().notNull().default('now()'),
}

const userBase = {
  ...base,
  userId: text()
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
}

const userPostBase = {
  ...userBase,
  postId: text()
    .references(() => post.id, { onDelete: 'cascade' })
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

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull()
});

export const badge = pgTable('badge', {
  ...base,
  name: text().notNull().unique(),
  description: text().notNull(),
  icon: text().notNull(),
  color: text().notNull(),
});
export const badgeRelations = relations(badge, (helpers) => {
  const userBadgesRelation = helpers.many(userBadge)
  const relations = { userBadges: userBadgesRelation }
  return relations
});

export const comment = pgTable(
  "comment",
  {
    ...userPostBase,
    content: text().notNull(),
    parentCommentId: text(),
  },
  (table) => [
    foreignKey({
      columns: [table.parentCommentId],
      foreignColumns: [table.id],
    })
  ]
);
export const commentRelations = relations(comment, (helpers) => {
  const relations = {
    commentLikes: helpers.many(commentLike),
    eventComments: helpers.many(eventComment),
    post: helpers.one(post, {
      fields: [comment.postId],
      references: [post.id],
    }),
    user: helpers.one(user, {
      fields: [comment.userId],
      references: [user.id],
    }),
  }
  return relations
});

export const commentLike = pgTable('commentLike', {
  ...userBase,
  commentId: text()
    .references(() => comment.id, { onDelete: 'cascade' })
    .notNull(),
});
export const commentLikeRelations = relations(commentLike, (helpers) => {
  const relations = {
    comment: helpers.one(comment, {
      fields: [commentLike.commentId],
      references: [comment.id],
    }),
    eventCommentLikes: helpers.many(eventCommentLike),
    user: helpers.one(user, {
      fields: [commentLike.userId],
      references: [user.id],
    }),
  }
  return relations
});

export const eventComment = pgTable('eventComment', {
  ...userPointsBase,
  commentId: text()
    .references(() => comment.id, { onDelete: 'cascade' })
    .notNull(),
})
export const eventCommentRelations = relations(eventComment, (helpers) => {
  const relations = {
    comment: helpers.one(comment, {
      fields: [eventComment.commentId],
      references: [comment.id],
    }),
    user: helpers.one(user, {
      fields: [eventComment.userId],
      references: [user.id],
    }),
  }
  return relations
});

export const eventCommentLike = pgTable('eventCommentLike', {
  ...userPointsBase,
  commentLikeId: text()
    .references(() => commentLike.id, { onDelete: 'cascade' })
    .notNull(),
})
export const eventCommentLikeRelations = relations(eventCommentLike, (helpers) => {
  const relations = {
    commentLike: helpers.one(commentLike, {
      fields: [eventCommentLike.commentLikeId],
      references: [commentLike.id],
    }),
    user: helpers.one(user, {
      fields: [eventCommentLike.userId],
      references: [user.id],
    }),
  }
  return relations
});

export const eventInvite = pgTable('eventInvite', {
  ...userPointsBase,
  inviteId: text()
    .references(() => invite.id, { onDelete: 'cascade' })
    .notNull(),
})
export const eventInviteRelations = relations(eventInvite, (helpers) => {
  const relations = {
    invite: helpers.one(invite, {
      fields: [eventInvite.inviteId],
      references: [invite.id],
    }),
    user: helpers.one(user, {
      fields: [eventInvite.userId],
      references: [user.id],
    }),
  }
  return relations
});

export const eventLogin = pgTable('eventLogin', {
  ...userPointsBase,
})
export const eventLoginRelations = relations(eventLogin, (helpers) => {
  const userRelation = helpers.one(user, {
    fields: [eventLogin.userId],
    references: [user.id],
  })
  const relations = { user: userRelation }
  return relations
});

export const eventPost = pgTable('eventPost', {
  ...userPostPointsBase,
})
export const eventPostRelations = relations(eventPost, (helpers) => {
  const postRelation = helpers.one(post, {
    fields: [eventPost.postId],
    references: [post.id],
  })
  const userRelation = helpers.one(user, {
    fields: [eventPost.userId],
    references: [user.id],
  })
  const relations = {
    post: postRelation,
    user: userRelation,
  }
  return relations
});

export const eventPostLike = pgTable('eventPostLike', {
  ...userPointsBase,
  postLikeId: text()
    .references(() => postLike.id, { onDelete: 'cascade' })
    .notNull(),
})
export const eventPostLikeRelations = relations(eventPostLike, (helpers) => {
  const postLikeRelation = helpers.one(postLike, {
    fields: [eventPostLike.postLikeId],
    references: [postLike.id],
  })
  const userRelation = helpers.one(user, {
    fields: [eventPostLike.userId],
    references: [user.id],
  })
  const relations = {
    postLike: postLikeRelation,
    user: userRelation,
  }
  return relations
})

export const eventView = pgTable('eventView', {
  ...userPostPointsBase,
})
export const eventViewRelations = relations(eventView, (helpers) => {
  const postRelation = helpers.one(post, {
    fields: [eventView.postId],
    references: [post.id],
  })
  const userRelation = helpers.one(user, {
    fields: [eventView.userId],
    references: [user.id],
  })
  const relations = {
    post: postRelation,
    user: userRelation,
  }
  return relations
});

export const invite = pgTable('invite', {
  ...base,
  accepted: boolean().notNull().default(false),
  acceptorId: text().references(() => user.id, { onDelete: 'cascade' }),
  code: text().notNull(),
  email: text().notNull(),
  senderId: text()
    .references(() => user.id, { onDelete: 'cascade' })
    .notNull(),
});
export const inviteRelations = relations(invite, (helpers) => {
  const relations = {
    eventInvites: helpers.many(eventInvite),
    recipient: helpers.one(user, {
      fields: [invite.acceptorId],
      references: [user.id],
    }),
    sender: helpers.one(user, {
      fields: [invite.senderId],
      references: [user.id],
    }),
  }
  return relations
});

export const list = pgTable('list', {
  ...userBase,
  title: text().notNull(),
  description: text('description'),
  public: boolean().notNull().default(false),
});
export const listRelations = relations(list, (helpers) => {
  const listItemsRelation = helpers.many(listItem)
  const postListsRelations = helpers.many(postList)
  const userRelation = helpers.one(user, {
    fields: [list.userId],
    references: [user.id],
  })
  const relations = {
    listItems: listItemsRelation,
    postListsRelations,
    user: userRelation,
  }
  return relations
});

export const listItem = pgTable('listItem', {
  ...base,
  listId: text()
    .references(() => list.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
});
export const listItemRelations = relations(listItem, (helpers) => {
  const listRelation = helpers.one(list, {
    fields: [listItem.listId],
    references: [list.id],
  })
  const relations = { list: listRelation }
  return relations
});

export const reward = pgTable('reward', {
  ...userBase,
  points: integer().notNull(),
  description: text().notNull(),
});
export const rewardRelations = relations(reward, (helpers) => {
  const userRelation = helpers.one(user, {
    fields: [reward.userId],
    references: [user.id],
  })
  const relations = { user: userRelation }
  return relations
});

export const post = pgTable('post', {
  ...userBase,
  content: text().notNull(),
  slug: text('slug').notNull().unique(),
  title: text().notNull(),
})
export const postRelations = relations(post, (helpers) => {
  const relations = {
    comments: helpers.many(comment),
    postLists: helpers.many(postList),
    user: helpers.one(user, {
      fields: [post.userId],
      references: [user.id],
    }),
    eventPosts: helpers.many(eventPost),
    eventViews: helpers.many(eventView),
  }
  return relations
});

export const postLike = pgTable('postLike', {
  ...userPostBase,
})
export const postLikeRelations = relations(postLike, (helpers) => {
  const relations = {
    eventPostLikes: helpers.many(eventPostLike),
    post: helpers.one(post, {
      fields: [postLike.postId],
      references: [post.id],
    }),
    user: helpers.one(user, {
      fields: [postLike.userId],
      references: [user.id],
    }),
  }
  return relations
});

export const postList = pgTable(
  'postList',
  {
    listId: text()
      .notNull()
      .references(() => list.id),
    postId: text()
      .notNull()
      .references(() => post.id),
  },
  (t) => [
    primaryKey({ columns: [t.listId, t.postId] })
  ],
);
export const postListRelations = relations(postList, (helpers) => {
  return {
    eventPostLikes: helpers.many(eventPostLike),
    list: helpers.one(list, {
      fields: [postList.listId],
      references: [list.id],
    }),
    post: helpers.one(post, {
      fields: [postList.postId],
      references: [post.id],
    })
  }
});

export const postTag = pgTable(
  'postTag',
  {
    postId: text()
      .notNull()
      .references(() => post.id),
    tagId: text()
      .notNull()
      .references(() => tag.id),
  },
  (table) => [
    primaryKey({ columns: [table.postId, table.tagId] })
  ],
);
export const postTagRelations = relations(postTag, (helpers) => {
  return {
    post: helpers.one(post, {
      fields: [postTag.postId],
      references: [post.id],
    }),
    tag: helpers.one(tag, {
      fields: [postTag.tagId],
      references: [tag.id],
    }),
  }
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  impersonatedBy: text('impersonated_by')
});

export const tag = pgTable('tag', {
  ...base,
  name: text().notNull().unique(),
})
export const tagRelations = relations(tag, (helpers) => {
  const relations = {
    postTags: helpers.many(postTag),
  }
  return relations
});

export const user = pgTable('user', {
  id: text("id").primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  role: text('role'),
  banned: boolean('banned'),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
  monthlyPoints: integer('monthly_points').notNull().default(0),
  points: integer('points').notNull().default(0),
  dkbaVerified: boolean().notNull().default(false),
  createdAt: timestamp('created_at').notNull(),
  updatedAt: timestamp('updated_at').notNull(),
});
export const userRelations = relations(user, (helpers) => {
  const relations = {
    userBadges: helpers.many(userBadge),
    comments: helpers.many(comment),
    commentLikes: helpers.many(commentLike),
    eventComments: helpers.many(eventComment),
    eventCommentLikes: helpers.many(eventCommentLike),
    eventInvites: helpers.many(eventInvite),
    eventLogins: helpers.many(eventLogin),
    eventPosts: helpers.many(eventPost),
    eventPostLikes: helpers.many(eventPostLike),
    eventViews: helpers.many(eventView),
    invites: helpers.many(invite),
    lists: helpers.many(list),
    pointRewards: helpers.many(reward),
    posts: helpers.many(post),
    postLikes: helpers.many(postLike),
  }
  return relations;
});

export const userBadge = pgTable('userBadge', {
  ...userBase,
  badgeId: text()
    .references(() => badge.id, { onDelete: 'cascade' })
    .notNull(),
})
export const userBadgeRelations = relations(userBadge, (helpers) => {
  const relations = {
    badge: helpers.one(badge, {
      fields: [userBadge.badgeId],
      references: [badge.id],
    }),
    user: helpers.one(user, {
      fields: [userBadge.userId],
      references: [user.id],
    }),
  }
  return relations
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at'),
  updatedAt: timestamp('updated_at')
});