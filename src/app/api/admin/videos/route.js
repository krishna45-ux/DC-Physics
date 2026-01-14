import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Video from '@/models/Video';
import { getUserFromCookie } from '@/lib/auth';

export async function POST(request) {
  const user = await getUserFromCookie();
  if (!user || user.role !== 'teacher') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    await dbConnect();
    const data = await request.json();
    const video = await Video.create(data);
    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
