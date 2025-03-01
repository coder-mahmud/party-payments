import express from 'express'
import { getAllPayments, createPayment, editPayment } from '../controllers/paymentController.js';

const paymentRoutes = express();

paymentRoutes.get("/", getAllPayments)
paymentRoutes.post("/new", createPayment)
paymentRoutes.post("/edit", editPayment)


export default paymentRoutes;