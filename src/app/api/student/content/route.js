import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Chapter from '@/models/Chapter';
import Video from '@/models/Video';
import User from '@/models/User';
import Progress from '@/models/Progress';
import { getUserFromCookie } from '@/lib/auth';

export async function GET(request) {
  const userDecoded = await getUserFromCookie();
  
  try {
    await dbConnect();

    let user = null;
    if (userDecoded) {
      user = await User.findById(userDecoded.userId);
    }

    const chapters = await Chapter.find({}).sort({ order: 1 });
    const videos = await Video.find({}).sort({ order: 1 });
    
    const content = await Promise.all(chapters.map(async (chapter) => {
      const chapterVideos = videos.filter(v => v.chapter.toString() === chapter._id.toString());
      
      let isUnlocked = false;
      if (user) {
        if (user.role === 'teacher') isUnlocked = true;
        if (chapter.classLevel === 11 && user.hasFullAccessClass11Physics) isUnlocked = true;
        if (chapter.classLevel === 12 && user.hasFullAccessClass12Physics) isUnlocked = true;
        if (user.purchasedChapters.includes(chapter._id)) isUnlocked = true;
      }

      const processedVideos = await Promise.all(chapterVideos.map(async (v) => {
         let isWatched = false;
         if (user) {
             const prog = await Progress.findOne({ user: user._id, video: v._id });
             if (prog && prog.isWatched) isWatched = true;
         }

         return {
           _id: v._id,
           title: v.title,
           url: isUnlocked ? v.url : null,
           isLocked: !isUnlocked,
           isWatched
         };
      }));

      return {
        ...chapter.toObject(),
        videos: processedVideos,
        isUnlocked
      };
    }));

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
