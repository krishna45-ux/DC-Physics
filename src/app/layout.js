import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'PhysicsMaster - Class 11 & 12 Physics',
  description: 'Learn Physics with the best lectures.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-200 text-center py-4">
          <p>&copy; {new Date().getFullYear()} PhysicsMaster. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
