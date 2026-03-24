import mongoose from "mongoose";

const MissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  geofence: { type: Object, default: null }, // Para el futuro
  devices: [{ type: mongoose.Schema.Types.ObjectId, ref: "Device" }], // Array de IDs
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Mission", MissionSchema);
