//Sales Orders
//TODO: fields

import mongoose from 'mongoose';

const SOSchema = new mongoose.Schema({});

const SOModel = mongoose.models?.SOs || mongoose.model('SOs', SOSchema);

export default SOModel;
