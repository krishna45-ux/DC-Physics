import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Order from '@/models/Order';
import { getUserFromCookie } from '@/lib/auth';

export async function POST(request) {
  const user = await getUserFromCookie();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

  const secret = process.env.RAZORPAY_KEY_SECRET || 'secret';
  
  const generated_signature = crypto
    .createHmac('sha256', secret)
    .update(razorpay_order_id + '|' + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    await dbConnect();
    
    const order = await Order.findOne({ orderId: razorpay_order_id });
    if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 400 });
    }
    
    if (order.status === 'paid') {
         return NextResponse.json({ status: 'success', message: 'Already paid' });
    }

    const dbUser = await User.findById(user.userId);
    const { productType, productId } = order;

    if (productType === 'course') {
        if (productId === 'class-12') dbUser.hasFullAccessClass12Physics = true;
        if (productId === 'class-11') dbUser.hasFullAccessClass11Physics = true;
    } else if (productType === 'chapter') {
        if (!dbUser.purchasedChapters.includes(productId)) {
            dbUser.purchasedChapters.push(productId);
        }
    }
    await dbUser.save();
    
    order.status = 'paid';
    await order.save();

    return NextResponse.json({ status: 'success' });
  } else {
    return NextResponse.json({ status: 'failure' }, { status: 400 });
  }
}
