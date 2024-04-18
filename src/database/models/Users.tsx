import mongoose from 'mongoose';

export type UserType = {
  _id: mongoose.Types.ObjectId;
  email: string;
  first_name: string;
  last_name: string;
  regist_date: Date;
  last_login: Date;
  address?: {
    street: { number: number; name: string };
    city: string;
    state?: string;
    postal_code: number;
    country: string;
  };
  phone?: { dial_code: string; number: number };
  birth_date?: Date;
  order_history: {
    order_id: mongoose.Types.ObjectId;
    cart_total: number;
    products_number: number;
    timestamp: Date;
  }[];
  preferences?: {
    payment_method?: string;
    ship_to_address?: boolean;
    language?: string;
    theme?: 'dark' | 'light' | 'system';
  };
  submissions: {
    subm_id: mongoose.Types.ObjectId;
    timestamp: Date;
    valid_codes: number;
  }[];
};

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
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
  birth_date: {
    type: Date,
  },
  last_login: {
    type: Date,
    default: Date.now,
  },
  order_history: {
    type: [
      {
        order_id: { type: mongoose.Schema.Types.ObjectId },
        cart_total: { type: Number },
        products_number: { type: Number },
        timestamp: { type: Date },
      },
    ],
  },
  submissions: {
    type: [
      {
        subm_id: { type: mongoose.Schema.Types.ObjectId },
        valid_codes: { type: Number },
        timestamp: { type: Date },
      },
    ],
  },
  address: {
    type: {
      street: { type: { name: { type: String }, number: { type: Number } } },
      city: { type: String },
      state: { type: String },
      postal_code: { type: Number },
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
