import { Db } from "../db/dbTypes"

export default async function findPostBySlugOrThrow(props: {
  db: Db
  slug: string
}) {
  const post = await props.db.query.posts.findFirst({
    where: (posts, query) => query.eq(posts.slug, props.slug),
  })
  if (post == null) {
    const message = `Post with slug ${props.slug} not found`
    throw new Error(message)
  }
  return post
}