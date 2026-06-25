import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, phone, zip, furnitureCount, message, photos } = await req.json();

  const photoLines = photos?.length
    ? photos.map((url: string, i: number) => `Photo ${i + 1}: ${url}`).join("\n")
    : "No photos uploaded";

  const body = `
New We Buy inquiry from ${name}

Name:              ${name}
Phone:             ${phone}
Zip Code:          ${zip}
Furniture Count:   ${furnitureCount}

What they have:
${message}

Photos:
${photoLines}
  `.trim();

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "yesterdaysnews1@gmail.com",
    subject: `New We Buy Inquiry — ${name}`,
    text: body,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
