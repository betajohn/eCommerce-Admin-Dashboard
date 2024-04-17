import mongoose from 'mongoose';

export interface PaymentType {
  _id: string;
  order_id: String;
  cart_total: number;
  payment_date: Date;
  client_data: {
    ip: string;
    geo: {
      city: string;
      country: string;
      latitude: string;
      longitude: string;
      region: string;
    };
  };
  payment_info: {
    //Danger. Encript this info before storing it in the database
    //Not sure I'll get this info from the payment processor
    card_number?: number;
    exp_date?: string;
    cvv?: number;
    //If customer used paypal or whatever
    user_id?: string;
    method: string;
    transaction_id: string;
  };
  billing_info?: {
    //payment processor will give me this info
    //Use it to contrast it with account info. Fraud prevention
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
  shipping_info?: {
    //if applicable
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
  //Store here or in User? need to investigate
  /*
  session_info: {
    //Session ID or Session token (same thing)
    session_id: string;
  };
  */
}

const PaymentSchema = new mongoose.Schema({
  _id: { type: String },
  order_id: { type: String },
  cart_total: { type: Number },
  payment_date: { type: Date, default: new Date() },
  client_data: {
    type: [
      {
        ip: String,
        geo: {
          type: {
            city: String,
            country: String,
            latitude: String,
            longitude: String,
            region: String,
          },
        },
      },
    ],
  },
  payment_info: {
    type: {
      card_number: Number,
      exp_date: String,
      cvv: Number,
      //If customer used paypal or whatever
      user_id: String,
      method: String,
      transaction_id: String,
    },
  },
  billing_info: {
    type: {
      first_name: String,
      last_name: String,
      address: String,
      city: String,
      state: String,
      postal_code: String,
      country: String,
    },
  },
  shipping_info: {
    type: {
      first_name: String,
      last_name: String,
      address: String,
      city: String,
      state: String,
      postal_code: String,
      country: String,
    },
  },
});

const PaymentModel =
  mongoose.models?.Payment || mongoose.model('Payment', PaymentSchema);

export { PaymentModel };
