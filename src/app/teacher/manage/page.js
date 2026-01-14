'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManageContent() {
  const [cTitle, setCTitle] = useState('');
  const [cClass, setCClass] = useState(12);
  const [cPrice, setCPrice] = useState(99);
  
  const [vTitle, setVTitle] = useState('');
  const [vUrl, setVUrl] = useState('');
  const [vChapter, setVChapter] = useState('');

  const [chapters, setChapters] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = () => {
    fetch('/api/admin/chapters')
      .then(res => res.json())
      .then(data => {
        if (data.chapters) setChapters(data.chapters);
      });
  };

  const handleAddChapter = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/chapters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: cTitle, classLevel: Number(cClass), price: Number(cPrice) }),
    });
    if (res.ok) {
      setMessage('Chapter added!');
      setCTitle('');
      fetchChapters();
    } else {
      setMessage('Error adding chapter');
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: vTitle, url: vUrl, chapter: vChapter }),
    });
    if (res.ok) {
      setMessage('Video added!');
      setVTitle('');
      setVUrl('');
    } else {
      setMessage('Error adding video');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
         <h1 className="text-3xl font-bold">Manage Content</h1>
         <Link href="/teacher/dashboard" className="text-blue-600 hover:underline">
            Back to Dashboard
         </Link>
      </div>
      
      {message && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{message}</div>}

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Add Chapter</h2>
          <form onSubmit={handleAddChapter} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Title</label>
              <input type="text" value={cTitle} onChange={e => setCTitle(e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Class</label>
              <select value={cClass} onChange={e => setCClass(e.target.value)} className="input-field">
                <option value={11}>11</option>
                <option value={12}>12</option>
              </select>
            </div>
            <div>
               <label className="block text-sm font-bold mb-1">Price</label>
               <input type="number" value={cPrice} onChange={e => setCPrice(e.target.value)} className="input-field" />
            </div>
            <button type="submit" className="btn btn-primary w-full">Add Chapter</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Add Video</h2>
          <form onSubmit={handleAddVideo} className="space-y-4">
            <div>
               <label className="block text-sm font-bold mb-1">Select Chapter</label>
               <select value={vChapter} onChange={e => setVChapter(e.target.value)} className="input-field" required>
                 <option value="">Select a chapter</option>
                 {chapters.map(c => (
                   <option key={c._id} value={c._id}>{c.title} (Class {c.classLevel})</option>
                 ))}
               </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Video Title</label>
              <input type="text" value={vTitle} onChange={e => setVTitle(e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">YouTube URL</label>
              <input type="text" value={vUrl} onChange={e => setVUrl(e.target.value)} className="input-field" placeholder="https://youtube.com/..." required />
            </div>
            <button type="submit" className="btn btn-secondary w-full" disabled={!vChapter}>Add Video</button>
          </form>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Existing Chapters</h2>
        <ul className="list-disc pl-5">
          {chapters.map(c => (
            <li key={c._id} className="mb-2">
              <span className="font-bold">{c.title}</span> (Class {c.classLevel}) - ₹{c.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
