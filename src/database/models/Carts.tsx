import mongoose from 'mongoose';

export interface CartType {
  id_: string;
  user_id: string;
  last_edition: Date;
  cart_total: number;
  products: [
    {
      product_id: string;
      product_name: string;
      quantity: number;
      price: number;
    }
  ];
}

const CartSchema = new mongoose.Schema({
  _id: { type: String },
  user_id: { type: String },
  timestamp: { type: Date, default: new Date() },
  cart_total: { type: Number },
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
});

const CartModel = mongoose.models?.Cart || mongoose.model('Cart', CartSchema);

export { CartModel };
