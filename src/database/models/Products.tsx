import mongoose from 'mongoose';

export interface Product extends mongoose.Document {
  //_id  //mongoDB automatically creates it
  name: string;
  price: number;
  description: string;
  category: string;
  image_url: string;
  rating: { rate: number; count: number };
}

/* PetSchema will correspond to a collection in your MongoDB database. */
const ProductSchema = new mongoose.Schema<Product>({
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
    type: String,
    required: [true, 'Category is required'],
    maxlength: [50, 'Max length 50 char'],
  },
  image_url: {
    /* Pet's age, if applicable */
    type: String,
    required: [true, 'Image is required'],
  },
  //just for data seeding
  rating: {
    rate: { type: Number },
    count: { type: Number },
  },
});

let ProductsModel =
  mongoose.models?.Product || mongoose.model<Product>('Product', ProductSchema);

export default ProductsModel;
