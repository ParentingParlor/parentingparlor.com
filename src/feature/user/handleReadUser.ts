import getRequiredAuthState from "../auth/getRequiredAuthState"
import { Db } from "../db/dbTypes"
import { ReadUserI, ReadUserO } from "./userTypes"
import findUserByIdOrThrow from "./findUserByIdOrThrow"

export default async function handleReadUser(props: {
  db: Db
  i: ReadUserI
}): Promise<ReadUserO> {
  await getRequiredAuthState()
  const user = await findUserByIdOrThrow({
    db: props.db,
    id: props.i.userId
  })
  return user
}