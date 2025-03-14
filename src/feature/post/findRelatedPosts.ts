import { Db } from "../db/dbTypes"
import { PostFindMany, RelatedPost } from "./postTypes"

export default async function findRelatedPosts(props: {
  db: Db
} & PostFindMany): Promise<RelatedPost[]> {
  const { db, ...rest } = props
  const posts = await db.query.post.findMany({
    ...rest,
    with: {
      comments: true,
      postLikes: true,
      postLists: true,
      postTags: {
        with: {
          tag: true,
        }
      },
      user: true,
    },
  })
  return posts
}