import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { NextRequest } from "next/server";

const handlers = createRouteHandler({ router: ourFileRouter });

export async function GET(req: NextRequest) {
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  return handlers.POST(req);
}
