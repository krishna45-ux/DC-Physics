import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Progress from '@/models/Progress';
import { getUserFromCookie } from '@/lib/auth';

export async function POST(request) {
  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { videoId } = await request.json();

  try {
    await dbConnect();
    await Progress.findOneAndUpdate(
        { user: user.userId, video: videoId },
        { isWatched: true },
        { upsert: true, new: true }
    );
    return NextResponse.json({ message: 'Progress updated' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
