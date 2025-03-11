import { ZodSchema } from "zod";

export default async function parseApiBody<Body>(props: {
  label: string;
  request: Request;
  schema: ZodSchema<Body>;
}): Promise<Body> {
  const data: unknown = await props.request.json();

  try {
    const body = props.schema.parse(data);
    return body;
  } catch (error) {
    const message = `Invalid ${props.label} body!`;
    console.error(message);
    throw error;
  }
}