import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
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
  registered_at: {
    type: Date,
  },
  last_login: {
    type: Date,
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

const ClientModel =
  mongoose.models?.Client || mongoose.model('Client', ClientSchema);

export default ClientModel;
