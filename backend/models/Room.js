import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomCode: { type: String, required: true, unique: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  teamSize: { type: Number, required: true, min: 2, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Room", roomSchema);
