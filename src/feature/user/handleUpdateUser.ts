import { user } from "@/db/schema"
import getRequiredAuthState from "../auth/getRequiredAuthState"
import { Db } from "../db/dbTypes"
import { UpdateUserI, UpdateUserO } from "./userTypes"
import { eq } from "drizzle-orm"

export default async function handleUpdateUser(props: {
  db: Db
  i: UpdateUserI
}): Promise<UpdateUserO> {
  const authState = await getRequiredAuthState()
  const filter = eq(user.id, authState.user.id)
  const [updated] = await props.db.update(user).set(props.i).where(filter).returning()
  return updated
}