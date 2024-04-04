//Sales Orders
//TODO: fields

import mongoose from 'mongoose';

const OrdersSchema = new mongoose.Schema({
  user: {
    type: {
      first_name: { type: String },
      last_name: { type: String },
      _id: { type: String },
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
