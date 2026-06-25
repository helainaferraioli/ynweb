import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  const body = `
New contact form submission from ${name}

Name:     ${name}
Email:    ${email}

Message:
${message}
  `.trim();

  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "yesterdaysnews1@gmail.com",
    subject: `New Contact Form Submission — ${name}`,
    text: body,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
