import { post } from "@/db/schema";
import { Db } from "../db/dbTypes";
import { CreatePostI, CreatePostO } from "./postTypes"
import getRequiredAuthState from "../auth/getRequiredAuthState";
import slugify from 'slugify'

export default async function handleCreatePost (props: {
  i: CreatePostI,
  db: Db
}): Promise<CreatePostO> {
  const authState = await getRequiredAuthState()
  if (props.i.publishedAt) {
    const admin = authState.user.role === 'admin'
    if (!admin) {
      throw new Error('Only admins can set publishedAt date')
    }
  }
  const slug = slugify(props.i.slug)
  const values = {
    ...props.i,
    slug,
    userId: authState.user.id
  }
  const [created] = await props.db.insert(post).values(values).returning()

  return created
}