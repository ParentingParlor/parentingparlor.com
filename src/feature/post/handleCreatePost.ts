import { post } from "@/db/schema";
import { Db } from "../db/dbTypes";
import { CreatePostI, CreatePostO } from "./postTypes";

export default async function handleCreatePost (props: {
  i: CreatePostI,
  db: Db
}): Promise<CreatePostO> {
  const [created] = await props.db.insert(post).values(props.i).returning()

  return created
}