import Payment from "../models/paymentModel.js";

const getAllPayments = async (req, res) => {
  const allPayments = await Payment.find();  
  res.status(200).json({payments:allPayments})
}

const createPayment = async (req, res) => {
  const {name, collegeRoll,image, mobile, message, screenShot, paidTo, imageUrl, screenshotUrl} = req.body
  console.log("Data", name, collegeRoll)

  const alreadyExists = await Payment.findOne({ collegeRoll });
  
  if (alreadyExists) {
    return res.status(400).json({
      success: false,
      message: 'Payment with this College Roll already exists'
    });
  }

  try {
    const newPayment = await Payment.create({
      name,
      collegeRoll,
      imageUrl,
      mobile,
      message,
      screenshotUrl,
      paidTo,
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Payment record created successfully',
      data: newPayment
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create payment record',
      error: error.message
    });
  }
}

const editPayment = async (req, res) => {
  const {paymentId,status} = req.body
  console.log(paymentId , status)
  const payment = await Payment.findById(paymentId);
  console.log("Payment",payment)
  
  if (!payment) {
    return res.status(404).json({
      success: false,
      message: 'Payment not found'
    });
  }

  payment.status = status || payment.status ;
  const updatedPayment = await payment.save();
  res.status(200).json({message:"Success.", payment: updatedPayment})
}


export {getAllPayments, createPayment, editPayment}