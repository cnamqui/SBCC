import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    nif: String,
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }],
    disbursements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disbursement'
    }]
  });

export const Merchant = mongoose.model('Merchant',merchantSchema);
 