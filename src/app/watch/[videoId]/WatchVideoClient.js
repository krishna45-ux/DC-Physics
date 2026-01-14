'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WatchVideoClient({ videoId }) {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
     fetch('/api/student/content')
      .then(res => res.json())
      .then(data => {
         if (data.content) {
            let found = null;
            for (const c of data.content) {
               const v = c.videos.find(v => v._id === videoId);
               if (v) {
                  found = { ...v, chapterTitle: c.title };
                  break;
               }
            }
            setVideoData(found);
         }
         setLoading(false);
      });
  }, [videoId]);

  const markWatched = async () => {
     await fetch('/api/student/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
     });
     setVideoData(prev => ({ ...prev, isWatched: true }));
     router.refresh();
  };

  if (loading) return <div>Loading video...</div>;
  if (!videoData) return <div>Video not found or access denied.</div>;
  if (videoData.isLocked) return <div>This video is locked. Please purchase the chapter.</div>;

  const getYoutubeId = (url) => {
     const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
     const match = url.match(regExp);
     return (match && match[2].length === 11) ? match[2] : null;
  };

  const yId = getYoutubeId(videoData.url);

  return (
    <div className="max-w-4xl mx-auto">
       <Link href="/dashboard" className="text-blue-600 mb-4 inline-block hover:underline">← Back to Dashboard</Link>
       <h1 className="text-3xl font-bold mb-2">{videoData.title}</h1>
       <p className="text-gray-600 mb-6">{videoData.chapterTitle}</p>

       <div className="aspect-video bg-black rounded overflow-hidden mb-6">
          {yId ? (
             <iframe 
               width="100%" 
               height="100%" 
               src={`https://www.youtube.com/embed/${yId}`} 
               title={videoData.title}
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          ) : (
             <div className="text-white flex items-center justify-center h-full">Invalid Video URL</div>
          )}
       </div>

       <div className="flex justify-end">
          <button 
             onClick={markWatched} 
             className={`btn ${videoData.isWatched ? 'bg-green-600 hover:bg-green-700' : 'btn-primary'}`}
             disabled={videoData.isWatched}
          >
             {videoData.isWatched ? '✓ Watched' : 'Mark as Watched'}
          </button>
       </div>
    </div>
  );
}
