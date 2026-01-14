import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Progress from '@/models/Progress';
import { getUserFromCookie } from '@/lib/auth';

export async function GET(request) {
  const user = await getUserFromCookie();
  if (!user || user.role !== 'teacher') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  try {
    await dbConnect();
    
    const studentCount = await User.countDocuments({ role: 'student' });
    
    const students = await User.find({ role: 'student' }).select('name email');
    
    const stats = await Promise.all(students.map(async (student) => {
        const watchedCount = await Progress.countDocuments({ user: student._id, isWatched: true });
        return {
            ...student.toObject(),
            watchedVideos: watchedCount
        };
    }));

    return NextResponse.json({ 
        totalStudents: studentCount,
        studentStats: stats
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
