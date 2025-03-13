import { user } from "@/db/schema";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export type User = typeof user.$inferSelect;
export type UserColumns = typeof user._.columns;

// Update
const userUpdateSchema = createUpdateSchema(user);
const userSelectSchema = createSelectSchema(user).extend({
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export const updateUserISchema = userUpdateSchema;
export type UpdateUserI = z.infer<typeof updateUserISchema>;
export const updateUserOSchema = userSelectSchema;
export type UpdateUserO = z.infer<typeof updateUserOSchema>;
