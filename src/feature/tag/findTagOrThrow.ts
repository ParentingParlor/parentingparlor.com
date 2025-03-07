import { Db } from '../db/dbTypes';
import * as dbSchema from '../../db/schema';
import { eq, SQL } from 'drizzle-orm';

type TagColumns = typeof dbSchema.tag._.columns;

export default async function findTagOrThrow(props: {
  db: Db
  label: string
  where: (columns: TagColumns) => SQL
}) {
  const user = await props.db.query.tag.findFirst({
    where: props.where,
  })
  if (user == null) {
    const message = `Tag ${props.label} not found`
    throw new Error(message)
  }
  return user
}