import { post } from "@/db/schema";
import { Db } from "../db/dbTypes";
import { CreatePostI, CreatePostO } from "./postTypes"
import getRequiredAuthState from "../auth/getRequiredAuthState";

export default async function handleCreatePost (props: {
  i: CreatePostI,
  db: Db
}): Promise<CreatePostO> {
  const authState = await getRequiredAuthState()
  const values = {
    ...props.i,
    userId: authState.user.id
  }
  const [created] = await props.db.insert(post).values(values).returning()

  return created
}