import { AnyColumn, sql } from "drizzle-orm";

export default function dbIncrement (props: {
  column: AnyColumn,
  value: number
}) {
  return sql`${props.column} + ${props.value}`;
};