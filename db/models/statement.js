import mongoose from "mongoose";

const statementSchema = new mongoose.Schema({
  createOn: Date,
  createdBy: String,
  bank: String,
  fromPeriod: Date,
  toPeriod: Date,
  records: {
    date: Date,
    description: String,
    withrawAmount: Number,
    depositNumber: Number,
    balance: Number
  }
});

const Statement = mongoose.model('statement', statementSchema);

export default Statement;
