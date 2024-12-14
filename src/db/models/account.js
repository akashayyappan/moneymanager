import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  createdOn: { type: Date, default: Date.now() },
  updatedOn: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  createdBy: { type: String, required: true },
  shortName: { type: String, required: true },
});

const Account = mongoose.model('account', accountSchema);

export default Account;
