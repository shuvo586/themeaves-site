import { NextResponse } from 'next/server';

/* The ticket desk. One POST handler that forwards a support ticket by email
   through the Resend API.

   It is inert until RESEND_API_KEY exists in the environment. The form shows
   an honest "not connected" state instead of pretending a ticket was filed.

   Environment:
     RESEND_API_KEY  the Resend secret. Absent = the desk is closed.
     SUPPORT_EMAIL   inbox the tickets land in. Defaults to the published one.
     SUPPORT_FROM    the verified sender Resend accepts. Defaults to Resend's
                     onboarding address, which works for testing a new account. */

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? 'support@themeaves.com';
const SUPPORT_FROM =
  process.env.SUPPORT_FROM ?? 'ThemeAves Support <onboarding@resend.dev>';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'The ticket desk is not connected yet. Email support@themeaves.com instead.' },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'The message did not come through.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const product = typeof body.product === 'string' ? body.product.trim() : '';
  const version = typeof body.version === 'string' ? body.version.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || name.length > 80) {
    return NextResponse.json({ error: 'A name is required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json(
      { error: 'The message is too short or too long.' },
      { status: 400 },
    );
  }
  if (version.length > 40 || product.length > 60) {
    return NextResponse.json({ error: 'The details are not right.' }, { status: 400 });
  }

  const lines = [
    `From: ${name} <${email}>`,
    `Product: ${product || 'not stated'}`,
    `Version: ${version || 'not stated'}`,
    '',
    message,
  ];

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: SUPPORT_FROM,
      to: [SUPPORT_EMAIL],
      reply_to: email,
      subject: `[Support] ${product || 'ThemeAves'} - ${name}`,
      text: lines.join('\n'),
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'The ticket service did not accept it. Email support@themeaves.com instead.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}