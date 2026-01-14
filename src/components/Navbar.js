import Link from 'next/link';
import { cookies } from 'next/headers';
import LogoutButton from './LogoutButton';

export default async function Navbar() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">PhysicsMaster</Link>
        <div className="space-x-4">
          {!token ? (
            <>
              <Link href="/login" className="hover:text-blue-200">Login</Link>
              <Link href="/register" className="hover:text-blue-200">Register</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="hover:text-blue-200">Dashboard</Link>
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
