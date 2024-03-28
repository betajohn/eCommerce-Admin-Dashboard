//Purchase Orders
//TODO: fields

import mongoose from 'mongoose';

const POSchema = new mongoose.Schema({});

const POModel = mongoose.models?.POs || mongoose.model('POs', POSchema);

export default POModel;
