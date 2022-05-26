import mongoose from "mongoose";

const shopperSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    cif: String,
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }]
  });

export const Shopper = mongoose.model('Shopper',shopperSchema);
 