import kneel from "kneel"
import { ReadUserI, readUserISchema, readUserOSchema } from "./userTypes"

export default async function kneelReadUser (props: {
  i: ReadUserI
}) {
  return await kneel({
    body: props.i,
    i: readUserISchema,
    url: '/api/user/read',
    o: readUserOSchema
  })
}