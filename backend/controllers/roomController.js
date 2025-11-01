import Room from "../models/Room.js";
import User from "../models/User.js";

function generateRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 6 })
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
}

// 🏗️ Create Room
export const createRoom = async (req, res) => {
  try {
    const { teamSize } = req.body;
    if (teamSize < 2 || teamSize > 5)
      return res.status(400).json({ message: "Team size must be between 2 and 5" });

    const roomCode = generateRoomCode();
    const room = await Room.create({
      roomCode,
      host: req.user._id,
      participants: [req.user._id],
      teamSize,
    });

    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ message: "Failed to create room", error: err.message });
  }
};

// 🙋 Join Room
export const joinRoom = async (req, res) => {
  try {
    const { code } = req.body;
    const room = await Room.findOne({ roomCode: code }).populate("participants", "username email");

    if (!room) return res.status(404).json({ message: "Room not found" });

    if (room.participants.length >= room.teamSize)
      return res.status(400).json({ message: "Room is full" });

    if (room.participants.find((u) => u._id.equals(req.user._id)))
      return res.status(400).json({ message: "You already joined this room" });

    room.participants.push(req.user._id);
    await room.save();

    const updatedRoom = await Room.findById(room._id).populate("participants", "username email");
    res.json(updatedRoom);
  } catch (err) {
    res.status(500).json({ message: "Failed to join room", error: err.message });
  }
};

// 📜 Get Room Details
export const getRoom = async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.code }).populate(
      "participants",
      "username email"
    );
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: "Error fetching room", error: err.message });
  }
};
