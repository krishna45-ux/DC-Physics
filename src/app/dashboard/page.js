'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function StudentDashboard() {
  const [content, setContent] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  useEffect(() => {
    if (content.length > 0) {
        let total = 0;
        let watched = 0;
        content.forEach(c => {
            c.videos.forEach(v => {
                total++;
                if (v.isWatched) watched++;
            });
        });
        setPercentage(total === 0 ? 0 : Math.round((watched / total) * 100));
    }
  }, [content]);

  const fetchData = () => {
     fetch('/api/student/content')
      .then(res => res.json())
      .then(data => {
         if (data.content) setContent(data.content);
         setLoading(false);
      });
  };

  const fetchUser = () => {
      fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
          if (data.user) setUser(data.user);
      });
  };

  const handleBuy = async (productId, productType, price) => {
    const res = await fetch('/api/payment/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: price, productId, productType }),
    });
    const order = await res.json();
    if (order.error) {
       alert('Error creating order');
       return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_123',
      amount: order.amount,
      currency: order.currency,
      name: 'PhysicsMaster',
      description: `Purchase ${productType}`,
      order_id: order.id,
      handler: async function (response) {
        const verifyRes = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          }),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.status === 'success') {
          alert('Payment Successful!');
          fetchData(); 
          fetchUser();
        } else {
          alert('Payment Verification Failed');
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Learning Dashboard</h1>
        <div className="space-x-4">
           {user && !user.hasFullAccessClass11Physics && (
             <button onClick={() => handleBuy('class-11', 'course', 999)} className="btn btn-primary">
               Buy Class 11 Full Course (₹999)
             </button>
           )}
           {user && !user.hasFullAccessClass12Physics && (
             <button onClick={() => handleBuy('class-12', 'course', 999)} className="btn btn-primary">
               Buy Class 12 Full Course (₹999)
             </button>
           )}
        </div>
      </div>

      <div className="mb-8 bg-white p-6 rounded shadow">
         <h2 className="text-xl font-bold mb-2">Your Progress</h2>
         <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-blue-600 h-4 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
         </div>
         <p className="mt-2 text-right font-bold">{percentage}% Completed</p>
      </div>

      <div className="space-y-8">
        {content.map(chapter => (
          <div key={chapter._id} className="bg-white p-6 rounded shadow">
             <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{chapter.title}</h2>
                  <p className="text-gray-600">Class {chapter.classLevel} - {chapter.videos.length} Videos</p>
                </div>
                {!chapter.isUnlocked && (
                   <button onClick={() => handleBuy(chapter._id, 'chapter', chapter.price)} className="btn btn-secondary">
                      Unlock Chapter (₹{chapter.price})
                   </button>
                )}
                {chapter.isUnlocked && <span className="text-green-600 font-bold bg-green-100 px-3 py-1 rounded">Unlocked</span>}
             </div>

             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chapter.videos.map(video => (
                   <div key={video._id} className={`border rounded p-4 ${video.isLocked ? 'bg-gray-100 opacity-70' : 'hover:shadow-md transition'}`}>
                      <h3 className="font-bold mb-2 truncate">{video.title}</h3>
                      {video.isLocked ? (
                         <div className="h-32 bg-gray-300 flex items-center justify-center rounded">
                            <span className="text-gray-500 font-bold">Locked</span>
                         </div>
                      ) : (
                         <div className="space-y-2">
                             <div className="relative h-32 bg-black rounded overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                                   ▶
                                </div>
                             </div>
                             <div className="flex justify-between items-center">
                                <Link href={`/watch/${video._id}`} className="text-blue-600 font-bold hover:underline">
                                   Watch Now
                                </Link>
                                {video.isWatched && <span className="text-green-600 text-sm">✓ Watched</span>}
                             </div>
                         </div>
                      )}
                   </div>
                ))}
             </div>
          </div>
        ))}
        {content.length === 0 && <p className="text-center text-gray-500">No courses available yet.</p>}
      </div>
    </div>
  );
}
