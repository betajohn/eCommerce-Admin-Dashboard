import mongoose from 'mongoose';

export interface UserType {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  regist_date: Date;
  last_login: Date;
  address?: {
    street: { number: number; name: string };
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
  phone?: { dial_code: string; number: number };
  birthdate: Date;
  order_history?: [
    {
      order_id: string;
      cart_total: number;
      products_number: number;
      date: Date;
    }
  ];
  preferences?: {
    payment_method?: string;
    ship_to_address?: boolean;
    language?: string;
    theme?: 'Dark' | 'Light' | 'System';
  };
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
  order_history: {
    type: [
      {
        order_id: { type: String },
        cart_total: { type: Number },
        products_number: { type: Number },
      },
    ],
  },
  address: {
    type: {
      street: { type: { name: { type: String }, number: { type: Number } } },
      city: { type: String },
      state: { type: String },
      postal_code: { type: String },
      country: { type: String },
    },
  },
  phone: {
    type: { number: { type: Number }, dial_code: { type: String } },
  },
  preferences: {
    type: {
      payment_method: String,
      ship_to_address: Boolean,
      language: String,
      theme: String,
    },
  },
});

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export { UserModel };
