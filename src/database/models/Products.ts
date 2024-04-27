import mongoose from 'mongoose';

export const categories = [
  "men's clothing",
  'electronics',
  "women's clothing",
  'jewelry',
] as const;

export interface ProductType {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  description: string;
  //category_OLD: (typeof categories)[number];
  category: {
    name: string;
    categ_id: mongoose.Types.ObjectId;
  };
  images: string[];
  rating?: { rate: number; count: number };
  status: 'active' | 'inactive';
}

type Product = ProductType & mongoose.Document;

/* ProductSchema will correspond to a collection in your MongoDB database. */
const ProductSchema = new mongoose.Schema<Product>({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, '_id is required'],
  },
  name: {
    /* The owner of this pet */
    type: String,
    required: [true, "Product's name is required"],
    maxlength: [100, 'Max length is 100 characters'],
  },
  price: {
    /* The species of your pet */
    type: Number,
    required: [true, 'Price is required'],
    maxlength: [7, "wow. Are you sure? That's expensive!"],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Max length 1000 char'],
  },
  category: {
    type: { name: { type: String }, categ_id: mongoose.Schema.Types.ObjectId },
  },
  images: [
    {
      /* Pet's age, if applicable */
      type: String,
      required: [false, 'Image is required'],
    },
  ],
  //just for data seeding
  rating: {
    rate: { type: Number },
    count: { type: Number },
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: [true, 'Listed is required'],
    default: 'active',
  },
});

let ProductsModel =
  mongoose.models?.Product || mongoose.model<Product>('Product', ProductSchema);

export { ProductsModel };
