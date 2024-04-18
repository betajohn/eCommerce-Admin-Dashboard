import mongoose from 'mongoose';

export interface SubmissionType {
  _id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  timestamp: Date;
  codes: {
    valid: string[];
    invalid?: string[];
  };
  valid_codes_n: number;
  invalid_codes_n?: number;
  payment_details?: {
    subm_payment_id: mongoose.Types.ObjectId;
    amount: number;
    method: string;
    payment_time: Date;
  };
}

const SubmissionSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  user_id: { type: mongoose.Schema.Types.ObjectId },
  timestamp: { type: Date, default: new Date() },
  codes: {
    type: {
      valid: { type: [{ type: String }] },
      invalid: { type: [{ type: String }] },
    },
  },
  valid_codes: { type: Number },
  invalid_codes: { type: Number },
  payment_details: {
    type: {
      payment_id: { type: mongoose.Schema.Types.ObjectId },
      amount: { type: Number },
      method: { type: String },
      payment_time: { type: Date },
    },
  },
});

const SubmissionModel =
  mongoose.models?.Submission || mongoose.model('Submission', SubmissionSchema);

export default SubmissionModel;
