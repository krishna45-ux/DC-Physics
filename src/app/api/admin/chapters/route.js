import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Chapter from '@/models/Chapter';
import { getUserFromCookie } from '@/lib/auth';

export async function GET(request) {
  try {
    await dbConnect();
    const chapters = await Chapter.find({}).sort({ order: 1 });
    return NextResponse.json({ chapters });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const user = await getUserFromCookie();
  if (!user || user.role !== 'teacher') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    await dbConnect();
    const data = await request.json();
    const chapter = await Chapter.create(data);
    return NextResponse.json({ chapter }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
