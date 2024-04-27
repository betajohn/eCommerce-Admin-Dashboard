import mongoose from 'mongoose';

export interface StoreConfigType {
  _id?: mongoose.Types.ObjectId;
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
        created_at: { Date },
        updated_at: { Date },
      },
    ],
  },
});

const StoreConfigModel =
  mongoose.models?.StoreConfig ||
  mongoose.model('StoreConfig', StoreConfigSchema);

export { StoreConfigModel };
