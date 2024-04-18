import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  user: {
    type: {
      first_name: { type: String },
      last_name: { type: String },
      user_id: { type: mongoose.Schema.Types.ObjectId },
    },
  },
  timestamp: { type: Date, default: new Date() },
  codes: { type: [{ type: String }] },
  paymentDetails: {
    type: {
      paymentTime: { type: Date },
      paymentID: { type: String },
      amountPaid: { type: Number },
      paymentMethod: { type: String },
    },
  },
});

const SubmissionModel =
  mongoose.models?.Submission || mongoose.model('Submission', SubmissionSchema);

export default SubmissionModel;
