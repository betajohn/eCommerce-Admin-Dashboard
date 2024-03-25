import productsData from './products.json';
import dbConnect from '@/database/dbConnect';
import {
  ProductsModel,
  PausedProductsModel,
  ProductType,
} from '@/database/models/Products';

await dbConnect();

export const seedProducts = async () => {
  try {
    const prod: ProductType[] = [];
    const pausedProd: ProductType[] = [];
    productsData.forEach((p) => {
      if (p.active === true) {
        prod.push(p);
      } else {
        pausedProd.push(p);
      }
    });
    await ProductsModel.create(prod);
    await PausedProductsModel.create(pausedProd);
    console.log('Products successfully seeded');
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
};
