import { NextResponse } from "next/server";

export type HandledResponse<Result> = Promise<NextResponse<Result | string>>;