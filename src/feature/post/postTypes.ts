import { post } from '@/db/schema';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const postInsertSchema = createInsertSchema(post);
const postSelectSchema = createSelectSchema(post);

export const createPostISchema = postInsertSchema.omit({ id: true, userId: true });
export type CreatePostI = z.infer<typeof createPostISchema>;
export const createPostOSchema = postSelectSchema;
export type CreatePostO = z.infer<typeof createPostOSchema>;

