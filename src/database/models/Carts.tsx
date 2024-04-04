import mongoose from 'mongoose';

export interface CartType {
  user_id: string;
  order_id?: string;
  timestamp: Date;
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
  user_id: { type: String },
  order_id: { type: String },
  timestamp: { type: Date, default: new Date() },
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
