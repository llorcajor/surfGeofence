import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true }, // ID Manual
  name: { type: String, required: true },
  model: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Device", DeviceSchema);
