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
  const slug = slugify(props.i.slug)
  const values = {
    ...props.i,
    slug,
    userId: authState.user.id
  }
  const [created] = await props.db.insert(post).values(values).returning()

  return created
}