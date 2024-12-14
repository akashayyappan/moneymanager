import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  createdOn: { type: Date, default: Date.now() },
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  description: { type: String, required: true },
});

const Vendor = mongoose.model('vendor', vendorSchema);

export default Vendor;
