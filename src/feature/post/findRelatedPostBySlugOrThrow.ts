import { Db } from "../db/dbTypes"
import { RelatedPost } from "./postTypes"

export default async function findPostBySlugOrThrow(props: {
  db: Db
  slug: string
}): Promise<RelatedPost> {
  const post = await props.db.query.post.findFirst({
    where: (table, query) => query.eq(table.slug, props.slug),
    with: {
      comments: true,
      postLikes: true,
      postLists: true,
      user: true,
    }
  })
  if (post == null) {
    const message = `Post with slug ${props.slug} not found`
    throw new Error(message)
  }
  return post
}