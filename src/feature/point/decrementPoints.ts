import { schema } from "@/db"
import { Db } from "../db/dbTypes"
import { eq } from "drizzle-orm"
import dbDecrement from "../db/dbDecrement"

export async function decrementPoints(props: {
  db: Db
  userId: string,
  points: number
}) {
  await props.db
    .update(schema.user)
    .set({
      points: dbDecrement({ column: schema.user.points, value: props.points }),
      monthlyPoints: dbDecrement({ column: schema.user.monthlyPoints, value: props.points }),
    })
    .where(eq(schema.user.id, props.userId))
}