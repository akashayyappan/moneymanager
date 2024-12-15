import mongoose from 'mongoose';

const statementSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  bank: { type: String, required: true },
  balance: { type: Number, required: true },
  createOn: { type: Date, required: true, default: Date.now() },
  createdBy: { type: String, required: true },
  description: { type: String, required: true },
  withrawAmount: { type: Number, required: true },
  depositAmount: { type: Number, required: true },
  vendorName: { type: String },
  account: { type: String },
});

const Statement = mongoose.model('statement', statementSchema);

export default Statement;
