'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TeacherDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  if (loading) return <div>Loading stats...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
         <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
         <Link href="/teacher/manage" className="btn btn-primary">
            Manage Content
         </Link>
      </div>

      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Overview</h2>
        <div className="text-4xl font-bold text-blue-600">
          {stats?.totalStudents || 0}
        </div>
        <p className="text-gray-600">Total Students</p>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Student Progress</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Watched Videos</th>
              </tr>
            </thead>
            <tbody>
              {stats?.studentStats?.map((student) => (
                <tr key={student._id} className="border-b">
                  <td className="py-2">{student.name}</td>
                  <td className="py-2">{student.email}</td>
                  <td className="py-2">{student.watchedVideos}</td>
                </tr>
              ))}
              {(!stats?.studentStats || stats.studentStats.length === 0) && (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-500">No students yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
