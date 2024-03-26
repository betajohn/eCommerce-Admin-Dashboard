import dbConnect from '@/database/dbConnect';
import { ProductsModel, PausedProductsModel } from '@/database/models/Products';

await dbConnect();

const ITEMS_PER_PAGE = 6;
export async function getAllProducts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const x = await Promise.all([
      ProductsModel.find().lean(),
      PausedProductsModel.find().lean(),
    ]);

    return [...x[0], ...x[1]];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Products.');
  }
}
