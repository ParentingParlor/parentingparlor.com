import { Db } from "../db/dbTypes"

export default async function findBadgeByNameOrThrow(props: {
  db: Db
  name: string
}) {
  const badge = await props.db.query.badges.findFirst({
    where: (columns, query) => query.eq(columns.name, props.name),
  })
  if (badge == null) {
    const message = `Badge with name ${props.name} not found`
    throw new Error(message)
  }
  return badge
}