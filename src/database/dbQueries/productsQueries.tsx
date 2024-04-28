import dbConnect from '@/database/dbConnect';
import mongoose from 'mongoose';
import { ProductsModel } from '@/database/models/Products';
import { unstable_noStore as noStore } from 'next/cache';
import { cleanMongoResponse, isValidIdString, timer } from '@/lib/utils';
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
    const categories = await StoreConfigModel.aggregate([
      { $unwind: '$categories' },
      {
        $addFields: {
          name: '$categories.name',
          description: '$categories.description',
          _id: '$categories._id',
        },
      },
      { $project: { name: 1, description: 1, _id: 1 } },
    ]);

    return cleanMongoResponse(categories);
  } catch (error) {
    console.log(error);
  }
}
