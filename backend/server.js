import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

import musicRoutes from "./routes/musicRoutes.js";
import authRoutes from "./routes/authroute.js";
import roomRoutes from "./routes/roomRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

import Message from "./models/Message.js";
import Room from "./models/Room.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/music", musicRoutes);

app.get("/", (req, res) => {
  res.send("✅ SyncWave API is running...");
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

// 🎧 In-memory music session state per room
const roomMusicState = {};

/*
roomMusicState = {
  ROOM123: {
    currentSong: {...},
    isPlaying: true,
    playbackTime: 45.2,
    lastUpdate: 1728472910000
  }
}
*/

io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  // 🔹 Join Room
  socket.on("join_room", async (roomCode) => {
    socket.join(roomCode);
    console.log(`👋 ${socket.id} joined ${roomCode}`);

    const state = roomMusicState[roomCode];
    if (state && state.currentSong) {
      const elapsed =
        state.isPlaying && state.lastUpdate
          ? (Date.now() - state.lastUpdate) / 1000 + state.playbackTime
          : state.playbackTime;

      socket.emit("sync_song", {
        song: state.currentSong,
        playbackTime: elapsed,
        isPlaying: state.isPlaying,
      });
    }

    io.to(roomCode).emit("room_update", `A user joined room ${roomCode}`);
  });

  // 🔹 Typing Events
  socket.on("typing", (data) => {
    io.to(data.roomCode).emit("user_typing", data.username);
  });
  socket.on("stop_typing", (data) => {
    io.to(data.roomCode).emit("user_stopped_typing", data.username);
  });

  // 💬 Messages
  socket.on("send_message", async (data) => {
    const { roomCode, user, content } = data;
    try {
      const room = await Room.findOne({ roomCode });
      if (!room) return console.error("❌ Room not found:", roomCode);

      const newMessage = new Message({
        room: room._id,
        sender: user._id,
        content,
      });
      await newMessage.save();

      io.to(roomCode).emit("receive_message", {
        sender: user,
        content,
        timestamp: newMessage.timestamp,
      });
    } catch (err) {
      console.error("❌ Message error:", err.message);
    }
  });

  // 🎵 Song Changed
  socket.on("change_song", ({ roomCode, song, username }) => {
    roomMusicState[roomCode] = {
      currentSong: song,
      isPlaying: true,
      playbackTime: 0,
      lastUpdate: Date.now(),
    };

    io.to(roomCode).emit("song_changed", {
      song,
      playbackTime: 0,
    });

    io.to(roomCode).emit("receive_message", {
      sender: { username: "System" },
      content: `🎶 ${username} changed the song to "${song.trackName}"`,
      timestamp: new Date(),
    });
  });

  // ⏯ Play/Pause toggle
  socket.on("toggle_music", ({ roomCode, isPlaying, playbackTime, username }) => {
    if (roomMusicState[roomCode]) {
      roomMusicState[roomCode].isPlaying = isPlaying;
      roomMusicState[roomCode].playbackTime = playbackTime;
      roomMusicState[roomCode].lastUpdate = Date.now();
    }
    io.to(roomCode).emit("music_play_toggled", { isPlaying, playbackTime });
  });

  // 🔁 Update Playback
  socket.on("update_playback_time", ({ roomCode, playbackTime }) => {
    if (roomMusicState[roomCode]) {
      roomMusicState[roomCode].playbackTime = playbackTime;
      roomMusicState[roomCode].lastUpdate = Date.now();
    }
  });

  // 🟡 NEW: Live Emoji Reactions
  socket.on("send_reaction", ({ roomCode, emoji, username }) => {
    console.log(`💫 ${username} reacted with ${emoji} in ${roomCode}`);
    // Broadcast to everyone in the same room
    io.to(roomCode).emit("receive_reaction", { emoji, username });
  });

  // 🔹 Leave Room
  socket.on("leave_room", (roomCode) => {
    socket.leave(roomCode);
    io.to(roomCode).emit("room_update", `A user left room ${roomCode}`);
  });

  // 🔹 Disconnect
  socket.on("disconnect", () => {
    console.log("🔴 Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
