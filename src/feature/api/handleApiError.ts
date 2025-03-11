import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export default function handleApiError(props: {
  label: string;
  error: unknown;
}): NextResponse<string> {
  if (!(props.error instanceof Error)) {
    console.error("Unknown API error", props.error);
    return new NextResponse("Unknown API error", { status: 500 });
  }
  const message = `${props.label} Error: ${props.error.message}`;
  console.error(message);
  console.error(props.error.stack);
  if (props.error instanceof ApiError) {
    return new NextResponse(props.error.message, {
      status: props.error.statusCode,
    });
  }
  return new NextResponse(props.error.message, { status: 500 });
}