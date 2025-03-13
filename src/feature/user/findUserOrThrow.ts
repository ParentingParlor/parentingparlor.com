import { Db } from '../db/dbTypes';
import { SQL } from 'drizzle-orm';
import { UserColumns } from './userTypes';

export default async function findUserOrThrow(props: {
  db: Db
  label: string
  where: (columns: UserColumns) => SQL
}) {
  const user = await props.db.query.user.findFirst({
    where: props.where,
  })
  if (user == null) {
    const message = `User ${props.label} not found`
    throw new Error(message)
  }
  return user
}