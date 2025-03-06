import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';
import * as dbSchema from './schema';
// import { posts, users } from "./schema";
// import { eq, SQL } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export const connection = postgres(process.env.DATABASE_URL);
export const db = drizzle(connection, { schema: dbSchema })

export const schema = dbSchema

// const result1 = await db.query.users.findMany({
//   where: (users, { eq }) => eq(posts.id, 1)
// });

// const result2 = await db.select().from(users).where(eq(posts.id, 1));
