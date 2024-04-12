//Sales Orders
//TODO: fields

import mongoose from 'mongoose';

export interface OrderType {
  _id?: string;
  user: {
    first_name: string;
    last_name: string;
    user_id: string;
  };
  cart: {
    cart_id: string;
    total: number;
    items_number: number;
  };
  payment: {
    method: string;
    payment_id: string;
  };
  timestamp: Date;
}

const OrdersSchema = new mongoose.Schema({
  user: {
    type: {
      first_name: { type: String },
      last_name: { type: String },
      user_id: { type: String },
    },
  },
  cart: {
    type: {
      cart_id: { type: String },
      total: { type: Number },
      items_number: { type: Number },
    },
  },
  payment: {
    type: { method: { type: String }, payment_id: { type: String } },
    required: true,
  },
  timestamp: { type: Date, default: new Date() },
});

const OrdersModel =
  mongoose.models?.Orders || mongoose.model('Orders', OrdersSchema);

export default OrdersModel;
