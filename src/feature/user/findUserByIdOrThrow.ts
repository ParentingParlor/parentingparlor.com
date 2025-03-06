import { Db } from "../db/dbTypes"
import findUserOrThrow from "./findUserOrThrow"
import { eq } from 'drizzle-orm'

export default async function findUserByIdOrThrow(props: {
  db: Db
  id: number
}) {
  const user = await findUserOrThrow({
    db: props.db,
    label: `with id ${props.id}`,
    where: (users) => eq(users.id, props.id)
  })
  
  return user
}