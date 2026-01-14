import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center space-y-8">
      <h1 className="text-4xl font-bold text-blue-900">Master Class 11 & 12 Physics</h1>
      <p className="text-xl text-gray-700 max-w-2xl mx-auto">
        Comprehensive video lectures for students. Prepare for your exams with expert guidance.
        Buy the full course or individual chapters.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
        <div className="bg-white p-6 rounded shadow border-t-4 border-blue-600">
          <h2 className="text-2xl font-bold mb-2">Class 11 Physics</h2>
          <p className="mb-4 text-gray-600">Complete curriculum for Class 11 students.</p>
          <div className="text-3xl font-bold text-blue-600 mb-4">₹999 <span className="text-sm font-normal text-gray-500">/ Full Course</span></div>
        </div>
        <div className="bg-white p-6 rounded shadow border-t-4 border-green-600">
          <h2 className="text-2xl font-bold mb-2">Class 12 Physics</h2>
          <p className="mb-4 text-gray-600">Complete curriculum for Class 12 students.</p>
          <div className="text-3xl font-bold text-blue-600 mb-4">₹999 <span className="text-sm font-normal text-gray-500">/ Full Course</span></div>
        </div>
      </div>
      
      <div className="mt-8">
         <p className="mb-4 text-gray-700">Individual chapters available at <strong>₹99/chapter</strong>.</p>
         <Link href="/login" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition">
            Start Learning Now
         </Link>
      </div>

      <div className="mt-12 text-left max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Meet Your Teacher</h3>
          <div className="flex items-center space-x-4 bg-white p-6 rounded shadow">
             <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                T
             </div>
             <div>
                <h4 className="text-xl font-bold">Mr. Physics Expert</h4>
                <p className="text-gray-600">10+ Years of experience in teaching Physics for Boards and Competitive exams.</p>
             </div>
          </div>
      </div>
    </div>
  );
}
