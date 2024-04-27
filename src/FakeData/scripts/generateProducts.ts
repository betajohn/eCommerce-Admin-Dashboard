import { ProductType } from '@/database/models/Products';
import products from '../raw/products/products.json';
import mongoose from 'mongoose';

const categories = [
  { name: "men's clothing", _id: '662ca0ac9567b6923fa27d4f' },
  { name: 'jewelry', _id: '662ca0ac9567b6923fa27d50' },
  { name: 'electronics', _id: '662ca0ac9567b6923fa27d51' },
  {
    name: "women's clothing",
    _id: '662ca0ac9567b6923fa27d52',
  },
];

export function generateProducts() {
  const finalProducts: ProductType[] = [];

  products.map((p) => {
    const categoryData = categories.find((c) => {
      return c.name === p.category;
    }) as (typeof categories)[number];

    const newP: ProductType = {
      _id: new mongoose.Types.ObjectId(p._id),
      name: p.name,
      description: p.description,
      price: p.price,
      category: {
        name: categoryData.name,
        categ_id: new mongoose.Types.ObjectId(categoryData._id),
      },
      images: p.images,
      status: p.status === 'active' ? 'active' : 'inactive',
      rating: p.rating,
    };

    finalProducts.push(newP);
  });
  return finalProducts;
}
