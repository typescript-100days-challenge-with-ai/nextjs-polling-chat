import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/lib/store';

export async function GET() {
  const messages = getMessages();
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const { user, message } = await request.json();
  if (!user || !message) {
    return NextResponse.json({ error: 'User and message are required' }, { status: 400 });
  }
  const newMessage = addMessage(user, message);
  return NextResponse.json(newMessage, { status: 201 });
}
