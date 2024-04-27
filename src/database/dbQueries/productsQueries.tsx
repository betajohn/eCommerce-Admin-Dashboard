import dbConnect from '@/database/dbConnect';
import mongoose from 'mongoose';
import { ProductsModel } from '@/database/models/Products';
import { unstable_noStore as noStore } from 'next/cache';
import { isValidIdString, timer } from '@/lib/utils';
import { StoreConfigModel } from '@/database/models/StoreConfig';

await dbConnect();

export async function getProductByID(_id: string) {
  try {
    if (!isValidIdString(_id)) {
      throw new Error('Invalid product _id');
    }
    const product = await ProductsModel.findById(
      new mongoose.Types.ObjectId(_id)
    );

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategories() {
  try {
    const storeConfig = await StoreConfigModel.find();

    return storeConfig[0].categories;
  } catch (error) {
    console.log(error);
  }
}
