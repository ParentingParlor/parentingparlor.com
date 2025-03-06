import { schema } from "@/db"
import { Db } from "../db/dbTypes"
import { eq } from "drizzle-orm"
import dbDecrement from "../db/dbDecrement"

export async function decrementPoints(props: {
  db: Db
  userId: number,
  points: number
}) {
  await props.db
    .update(schema.users)
    .set({
      points: dbDecrement({ column: schema.users.points, value: props.points }),
      monthlyPoints: dbDecrement({ column: schema.users.monthlyPoints, value: props.points }),
    })
    .where(eq(schema.users.id, props.userId))
}