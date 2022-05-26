import mongoose from "mongoose";

const disbursementSchema = new mongoose.Schema({ 
    merchant_id: Number,
    amount: String,
    created_at: Date,
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant' 
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order' 
    },
  });

export const Disbursement = mongoose.model('Disbursement',disbursementSchema);
 