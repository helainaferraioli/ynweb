import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";
import { NextRequest } from "next/server";

const handlers = createRouteHandler({ router: ourFileRouter });

export async function GET(req: NextRequest) {
  return handlers.GET(req);
}

export async function POST(req: NextRequest) {
  const res = await handlers.POST(req);
  if (!res.ok) {
    const body = await res.clone().text();
    console.error("[uploadthing] POST error", res.status, body);
  }
  return res;
}
