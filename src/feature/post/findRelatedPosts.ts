import { desc } from "drizzle-orm"
import { Db } from "../db/dbTypes"
import { PostFindMany, RelatedPost } from "./postTypes"
import { post } from "@/db/schema"

export default async function findRelatedPosts(props: {
  db: Db
} & PostFindMany): Promise<RelatedPost[]> {
  const { db, ...rest } = props
  const posts = await db.query.post.findMany({
    with: {
      comments: true,
      postLikes: true,
      postLists: true,
      user: true,
    },
    ...rest,
  })
  return posts
}