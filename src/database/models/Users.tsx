import mongoose from 'mongoose';

export interface UserType {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  regist_date: Date;
  last_login: Date;
  address?: {
    street: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
  phone: string;
  birthdate: Date;
}

const UserSchema = new mongoose.Schema({
  _id: { type: String },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  first_name: {
    type: String,
    required: [true, 'First name is required'],
  },
  last_name: {
    type: String,
    required: [true, 'Last name is required'],
  },
  regist_date: {
    type: Date,
    default: Date.now,
  },
  last_login: {
    type: Date,
    default: Date.now,
  },
  orders: {
    type: [{ order_id: { type: String } }],
  },
  address: {
    type: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postal_code: { type: String },
      country: { type: String },
    },
  },
  phone: {
    type: String,
  },
});

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export { UserModel };
