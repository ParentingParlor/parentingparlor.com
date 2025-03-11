import { ZodSchema } from "zod";
import { NextResponse } from "next/server";
import parseApiBody from "./parseApiBody";
import handleApiError from "./handleApiError";
import { db } from "@/db";
import { HandledResponse } from "./apiTypes";
import { Db } from "../db/dbTypes";

export async function handleApi<I, O>(props: {
  i: ZodSchema<I>;
  o: ZodSchema<O>;
  label: string;
  handle: (props: { i: I; db: Db }) => Promise<O>;
  request: Request;
}): HandledResponse<O> {
  try {
    const i = await parseApiBody({
      label: props.label,
      request: props.request,
      schema: props.i,
    });
    const result = await db.transaction(
      async (tx) => {
        const result = await props.handle({ i, db: tx });
        return result;
      },
      { isolationLevel: "serializable" }
    );
    const responseBody = props.o.parse(result);
    const response = NextResponse.json(responseBody);
    return response;
  } catch (error) {
    const response = handleApiError({ error, label: props.label });
    return response;
  }
}