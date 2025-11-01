import Message from "../models/Message.js";
import Room from "../models/Room.js";

// 💬 Save new message
export const sendMessage = async (req, res) => {
  try {
    const { roomCode, content } = req.body;
    const room = await Room.findOne({ roomCode });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const message = await Message.create({
      room: room._id,
      sender: req.user._id,
      content,
    });

    const populatedMsg = await message.populate("sender", "username email");
    res.status(201).json(populatedMsg);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
};

// 📜 Get all messages for a room
export const getMessages = async (req, res) => {
  try {
    const room = await Room.findOne({ roomCode: req.params.code });
    if (!room) return res.status(404).json({ message: "Room not found" });

    const messages = await Message.find({ room: room._id })
      .populate("sender", "username email")
      .sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
};
