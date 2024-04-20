//Sales Orders
//TODO: fields

import { PaymentType } from '@/database/models/Payments';
import mongoose from 'mongoose';

export interface OrderType {
  _id: mongoose.Types.ObjectId;
  user: {
    first_name: string;
    last_name: string;
    user_id: mongoose.Types.ObjectId;
  };
  cart: {
    cart_total: number;
    cart_id: mongoose.Types.ObjectId;
    n_of_items: number;
    products: {
      product_id: mongoose.Types.ObjectId;
      product_name: string;
      quantity: number;
      price: number;
    }[];
  };
  payment?: {
    method: string;
    payment_id: mongoose.Types.ObjectId;
  };
  assignPayment?: PaymentType;
  timestamp: Date;
}

const OrdersSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  user: {
    type: {
      first_name: { type: String },
      last_name: { type: String },
      user_id: { type: mongoose.Schema.Types.ObjectId },
    },
  },
  cart: {
    type: {
      cart_total: { type: Number },
      n_of_items: { type: Number },
      cart_id: { type: mongoose.Schema.Types.ObjectId },
      products: {
        type: [
          {
            product_id: { type: mongoose.Schema.Types.ObjectId },
            product_name: { type: String },
            quantity: { type: Number },
            price: { type: Number },
          },
        ],
      },
    },
  },
  payment: {
    type: {
      method: { type: String },
      payment_id: { type: mongoose.Schema.Types.ObjectId },
    },
    required: true,
  },
  timestamp: { type: Date, default: new Date() },
});

const OrdersModel =
  mongoose.models?.Orders || mongoose.model('Orders', OrdersSchema);

export default OrdersModel;
