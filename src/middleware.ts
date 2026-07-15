import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const base64 = authHeader.replace("Basic ", "");
    const decoded = Buffer.from(base64, "base64").toString("utf-8");
    const [user, pass] = decoded.split(":");

    if (
      user === process.env.STUDIO_USERNAME &&
      pass === process.env.STUDIO_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Unauthorized", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Studio"' },
  });
}

export const config = {
  matcher: ["/studio/:path*"],
};
