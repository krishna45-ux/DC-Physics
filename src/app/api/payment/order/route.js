import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import dbConnect from '@/lib/db';
import Order from '@/models/Order';
import { getUserFromCookie } from '@/lib/auth';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_123',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'secret',
});

export async function POST(request) {
  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { amount, productId, productType } = await request.json(); 

  const options = {
    amount: amount * 100, 
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
    notes: {
      userId: user.userId,
      productType,
      productId
    }
  };

  try {
    const order = await razorpay.orders.create(options);
    
    await dbConnect();
    await Order.create({
        orderId: order.id,
        userId: user.userId,
        amount: amount,
        currency: 'INR',
        productType,
        productId
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error creating order' }, { status: 500 });
  }
}
