import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  symbol: String,
  name: String,
  price: Number,
  allTimeHighUSD: Number,
  timestamp: { type: Date, default: Date.now },
});

priceSchema.index({ name: 1, timestamp: -1 });

export default mongoose.model('Price', priceSchema);
