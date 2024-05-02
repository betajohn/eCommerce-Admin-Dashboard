import mongoose from 'mongoose';

export type ShortedCategoriesType = {
  _id: mongoose.Types.ObjectId | string;
  name: string;
  description: string;
}[];

export interface StoreConfigType {
  _id: mongoose.Types.ObjectId;
  categories: {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
  }[];
}

const StoreConfigSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  categories: {
    type: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String },
        description: { type: String },
        created_at: { type: Date },
        updated_at: { type: Date },
      },
    ],
  },
});

const StoreConfigModel =
  mongoose.models?.StoreConfig ||
  mongoose.model('StoreConfig', StoreConfigSchema);

export { StoreConfigModel };
