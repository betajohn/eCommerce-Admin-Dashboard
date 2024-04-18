import mongoose from 'mongoose';

export interface CartType {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  last_edition: Date;
  cart_total: number;
  number_of_items: number;
  products: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
}

const CartSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  last_edition: { type: Date, default: new Date() },
  cart_total: { type: Number },
  number_of_items: { type: Number },
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
