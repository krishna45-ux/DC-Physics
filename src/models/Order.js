import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: Number,
  currency: String,
  productType: String,
  productId: String,
  status: { type: String, default: 'created' },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
