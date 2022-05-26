import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    id : Number,
    merchant_id : Number,
    shopper_id : Number,
    amount : Number,
    created_at : {type: Date, required: false},
    completed_at : {type: Date, required: false },
    disbursement_processed_on : {type: Date, required: false },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant' 
    },
    shopper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shopper' 
    },
    // disbursement: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Disbursement' 
    // }
  });

export const Order = mongoose.model('Order',orderSchema);
 