import { schema } from "@/db"
import { Db } from "../db/dbTypes"
import dbIncrement from "../db/dbIncrement"
import { eq } from "drizzle-orm"

export async function incrementPoints(props: {
  db: Db
  userId: number,
  points: number
}) {
  await props.db
    .update(schema.users)
    .set({
      points: dbIncrement({ column: schema.users.points, value: props.points }),
      monthlyPoints: dbIncrement({ column: schema.users.monthlyPoints, value: props.points }),
    })
    .where(eq(schema.users.id, props.userId))
}