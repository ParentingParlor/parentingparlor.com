import { db } from '@/db';
import { comment, post, postLike, postList, postTag, tag, user } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export type Post = typeof post.$inferSelect;
export type PostColumns = typeof post._.columns;

export type RelatedPost = InferSelectModel<typeof post> & {
  comments: InferSelectModel<typeof comment>[]
  postLikes: InferSelectModel<typeof postLike>[]
  postLists: InferSelectModel<typeof postList>[]
  postTags: (InferSelectModel<typeof postTag> & {
    tag: InferSelectModel<typeof tag>
  })[]
  user: InferSelectModel<typeof user>
};

const postInsertSchema = createInsertSchema(post);
const postSelectSchema = createSelectSchema(post);

export type PostFindMany = Parameters<typeof db.query.post.findMany>[0];

export const createPostISchema = postInsertSchema.omit({ id: true, userId: true });
export type CreatePostI = z.infer<typeof createPostISchema>;
export const createPostOSchema = postSelectSchema.extend({
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type CreatePostO = z.infer<typeof createPostOSchema>;

