import dbConnect from '@/database/dbConnect';
import mongoose from 'mongoose';
import { ProductsModel } from '@/database/models/Products';
import { unstable_noStore as noStore } from 'next/cache';
import { timer } from '@/lib/utils';

await dbConnect();

export async function getProductByID(_id: string) {
  try {
    const product = await ProductsModel.findById(
      new mongoose.Types.ObjectId(_id)
    );
    return product;
  } catch (error) {
    console.log(error);
  }
}
