import productsData from './products.json';
import dbConnect from '@/database/dbConnect';
import ProductsModel from '@/database/models/Products';

await dbConnect();

export const seedProducts = async () => {
  try {
    await ProductsModel.create(productsData);
    console.log('Data successfully seeded');
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
};
