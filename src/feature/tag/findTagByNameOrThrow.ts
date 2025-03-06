import { Db } from "../db/dbTypes"
import findTagOrThrow from "./findTagOrThrow"
import { eq } from 'drizzle-orm';

export default async function findTagByNameOrThrow(props: {
  db: Db
  name: string
}) {
  const user = await findTagOrThrow({
    db: props.db,
    label: `with name ${props.name}`,
    where: (columns) => eq(columns.name, props.name)
  })
  return user
}