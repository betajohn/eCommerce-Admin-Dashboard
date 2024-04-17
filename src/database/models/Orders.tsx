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
    cart_total: number;
    cart_id: string;
    n_of_items: number;
    products: {
      product_id: string;
      product_name: string;
      quantity: number;
      price: number;
    }[];
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
      cart_total: { type: Number },
      n_of_items: { type: Number },
      cart_id: { type: String },
      products: {
        type: [
          {
            product_id: { type: String },
            product_name: { type: String },
            quantity: { type: Number },
            price: { type: Number },
          },
        ],
      },
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
