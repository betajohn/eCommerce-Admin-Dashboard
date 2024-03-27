import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, '_id is required'],
  },
  total: {
    type: Number,
    required: [true, 'Total is required'],
  },
  products: {
    type: [
      {
        productID: { type: String, required: [true, 'ProductID is required'] },
        quantity: { type: Number, required: [true, 'Quantity is required'] },
        unitaryPrice: {
          type: Number,
          required: [true, 'unitaryPrice is required'],
        },
      },
    ],
  },
  client_id: {
    type: String,
    required: [true, 'ClientID is required'],
  },
  payment_method: {
    type: String,
    required: [true, 'Payment is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
});

const InvoiceModel =
  mongoose.models?.Invoice || mongoose.model('Invoice', InvoiceSchema);

export default InvoiceModel;
