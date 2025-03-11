import { post } from "@/db/schema";
import { Db } from "../db/dbTypes";
import { CreatePostI, CreatePostO } from "./postTypes"
import getRequiredAuthSession from "../auth/getRequiredAuthSession";

export default async function handleCreatePost (props: {
  i: CreatePostI,
  db: Db
}): Promise<CreatePostO> {
  const session = await getRequiredAuthSession()
  const values = {
    ...props.i,
    userId: session.user.id
  }
  const [created] = await props.db.insert(post).values(values).returning()

  return created
}