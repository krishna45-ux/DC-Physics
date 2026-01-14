'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [secretCode, setSecretCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role, secretCode }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field" 
            required 
          />
        </div>
        <div>
           <label className="block text-gray-700 mb-1">Role</label>
           <select value={role} onChange={(e) => setRole(e.target.value)} className="input-field">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
           </select>
        </div>
        {role === 'teacher' && (
           <div>
             <label className="block text-gray-700 mb-1">Teacher Secret Code</label>
             <input 
                type="text"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="input-field"
                placeholder="Enter admin secret"
             />
           </div>
        )}
        <button type="submit" className="w-full btn btn-primary">Register</button>
      </form>
      <div className="mt-4 text-center">
        <p>Already have an account? <Link href="/login" className="text-blue-600">Login</Link></p>
      </div>
    </div>
  );
}
