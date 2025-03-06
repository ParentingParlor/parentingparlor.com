import { Db } from '../db/dbTypes';
import * as dbSchema from '../../db/schema';
import { eq, SQL } from 'drizzle-orm';

type UserColumns = typeof dbSchema.users._.columns;

export default async function findUserOrThrow(props: {
  db: Db
  label: string
  where: (columns: UserColumns) => SQL
}) {
  const user = await props.db.query.users.findFirst({
    where: props.where,
  })
  if (user == null) {
    const message = `User ${props.label} not found`
    throw new Error(message)
  }
  return user
}