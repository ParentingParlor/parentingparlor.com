import { Db } from "../db/dbTypes"
import findUserOrThrow from "./findUserOrThrow"
import { eq } from 'drizzle-orm'

export default async function findUserByEmailOrThrow(props: {
  db: Db
  email: string
}) {
  const user = await findUserOrThrow({
    db: props.db,
    label: `with email ${props.email}`,
    where: (users) => eq(users.email, props.email)
  })
  return user
}