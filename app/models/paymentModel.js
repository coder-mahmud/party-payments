import mongoose from "mongoose";
import User from './userModels.js'

const paymentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    collegeRoll: { type: String, required: true, unique:true},
    imageUrl: { type: String, },
    screenshotUrl: { type: String, },
    mobile: { type: String,},
    message: { type: String,},
    paidTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },  
    status: { 
        type: String, 
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;