import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return NextResponse.json({ error: "INSTAGRAM_ACCESS_TOKEN not set" }, { status: 500 });
  }

  const res = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=24&access_token=${token}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    const err = await res.json();
    return NextResponse.json({ error: "Instagram API error", detail: err }, { status: 502 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
