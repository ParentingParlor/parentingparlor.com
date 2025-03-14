import { schema } from "@/db"
import { Db } from "../db/dbTypes"
import dbIncrement from "../db/dbIncrement"
import { eq } from "drizzle-orm"

export async function incrementPoints(props: {
  db: Db
  userId: string
  points: number
}) {
  await props.db
    .update(schema.user)
    .set({
      points: dbIncrement({ column: schema.user.points, value: props.points }),
      monthlyPoints: dbIncrement({ column: schema.user.monthlyPoints, value: props.points }),
    })
    .where(eq(schema.user.id, props.userId))
}