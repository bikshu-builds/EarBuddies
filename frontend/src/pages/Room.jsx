import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";
import socket from "../utils/socket";
import dayjs from "dayjs";
import axios from "axios";

const Room = () => {
  const { code } = useParams();
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [reactions, setReactions] = useState([]);
  const audioRef = useRef(null);
  const chatEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🧭 Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📦 Load room, chat, and songs
  useEffect(() => {
    const loadData = async () => {
      try {
        const [roomRes, msgRes, songsRes] = await Promise.all([
          api.get(`/rooms/${code}`),
          api.get(`/messages/${code}`),
          axios.get("http://localhost:5000/api/music/songs?term=telugu"),
        ]);
        setRoom(roomRes.data);
        setMessages(msgRes.data);
        setSongs(songsRes.data);
      } catch (err) {
        console.error("❌ Failed to load:", err);
      }
    };
    loadData();

    socket.emit("join_room", code);

    // 🗨️ Chat events
    socket.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
    socket.on("user_typing", (u) =>
      setTypingUsers((p) => (p.includes(u) ? p : [...p, u]))
    );
    socket.on("user_stopped_typing", (u) =>
      setTypingUsers((p) => p.filter((x) => x !== u))
    );

    // 🎵 Music events
    socket.on("song_changed", ({ song, playbackTime }) => {
      setCurrentSong(song);
      if (audioRef.current) {
        audioRef.current.src = song.previewUrl;
        audioRef.current.currentTime = playbackTime || 0;
        audioRef.current.play();
      }
      setIsPlaying(true);
    });

    socket.on("music_play_toggled", ({ isPlaying, playbackTime }) => {
      if (!audioRef.current) return;
      audioRef.current.currentTime = playbackTime || 0;
      setIsPlaying(isPlaying);
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    });

    // 💫 Emoji Reactions
    socket.on("receive_reaction", ({ emoji, username }) => {
      console.log(`💫 ${username} reacted with ${emoji}`);
      triggerEmojiRain(emoji);
    });

    return () => {
      socket.emit("leave_room", code);
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stopped_typing");
      socket.off("song_changed");
      socket.off("music_play_toggled");
      socket.off("receive_reaction");
    };
  }, [code]);

  // ✍️ Typing
  const typingTimeoutRef = useRef(null);
  const handleTyping = (e) => {
    const value = e.target.value;
    setNewMessage(value);
    if (!user?.username) return;
    socket.emit("typing", { roomCode: code, username: user.username });
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { roomCode: code, username: user.username });
    }, 1000);
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !user?._id) return;
    socket.emit("send_message", { roomCode: code, user, content: newMessage });
    setNewMessage("");
  };

  // 🎶 Song select
  const handleSongSelect = (song) => {
    setCurrentSong(song);
    if (audioRef.current) {
      audioRef.current.src = song.previewUrl;
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      socket.emit("change_song", {
        roomCode: code,
        song,
        username: user.username,
        playbackTime: 0,
      });
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    const newStatus = !isPlaying;
    const playbackTime = audioRef.current.currentTime;
    setIsPlaying(newStatus);
    newStatus ? audioRef.current.play() : audioRef.current.pause();
    socket.emit("toggle_music", {
      roomCode: code,
      isPlaying: newStatus,
      playbackTime,
      username: user.username,
    });
  };

  // 🕒 Track time
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current && isPlaying) {
        setCurrentTime(audioRef.current.currentTime);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // 💥 Emoji Rain
  const triggerEmojiRain = (emoji) => {
    const id = Date.now();
    setReactions((prev) => [...prev, { id, emoji }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 4000);
  };

  const sendReaction = (emoji) => {
    triggerEmojiRain(emoji);
    socket.emit("send_reaction", {
      roomCode: code,
      emoji,
      username: user.username,
    });
  };

  if (!room) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="flex flex-col items-center mt-10 text-white relative overflow-hidden">
      <h1 className="text-3xl mb-2 font-bold">Room: {room.roomCode}</h1>

      {/* 🎵 Shared Player */}
      <div className="bg-gray-800 p-4 rounded-lg w-[450px] mb-4">
        <h2 className="text-xl font-semibold mb-2">🎶 Shared Music Player</h2>
        {currentSong ? (
          <div className="text-center">
            <img
              src={currentSong.artworkUrl100}
              alt={currentSong.trackName}
              className="w-40 h-40 mx-auto rounded-lg mb-2"
            />
            <h3 className="font-semibold">{currentSong.trackName}</h3>
            <p className="text-gray-400">{currentSong.artistName}</p>
            <p className="text-gray-400 text-sm">
              {Math.floor(currentTime)}s / 30s
            </p>
            <audio ref={audioRef} hidden />
            <button
              onClick={togglePlay}
              className="bg-blue-600 px-4 py-2 mt-3 rounded hover:bg-blue-700"
            >
              {isPlaying ? "⏸ Pause" : "▶️ Play"}
            </button>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            No song playing — choose one below 👇
          </p>
        )}
      </div>

      {/* 🎧 Songs */}
      <div className="grid grid-cols-2 gap-3 w-[450px] mb-5">
        {songs.slice(0, 8).map((song, i) => (
          <div
            key={i}
            onClick={() => handleSongSelect(song)}
            className="bg-gray-700 rounded-lg p-2 cursor-pointer hover:bg-gray-600 transition"
          >
            <img
              src={song.artworkUrl100}
              alt={song.trackName}
              className="rounded mb-2"
            />
            <p className="font-semibold text-sm truncate">{song.trackName}</p>
            <p className="text-gray-400 text-xs truncate">{song.artistName}</p>
          </div>
        ))}
      </div>

      {/* 💬 Chat */}
      <div className="bg-gray-700 w-96 h-96 rounded p-3 flex flex-col overflow-y-auto mb-2">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center">No messages yet...</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.sender?._id === user?._id
                ? "text-green-400 text-right"
                : "text-white"
            }`}
          >
            <div>
              <strong>{msg.sender?.username || "Unknown"}</strong>:{" "}
              {msg.content}
            </div>
            <small className="text-gray-400 text-sm">
              {dayjs(msg.timestamp).format("HH:mm")}
            </small>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* ⌨️ Typing */}
      {typingUsers.length > 0 && (
        <p className="text-sm text-gray-400 mb-2">
          {typingUsers.join(", ")}{" "}
          {typingUsers.length > 1 ? "are typing..." : "is typing..."}
        </p>
      )}

      {/* 🎉 Emoji Buttons */}
      <div className="flex space-x-3 mb-4">
        {["❤️", "😂", "🔥", "🎵", "👏", "😍"].map((emoji) => (
          <button
            key={emoji}
            onClick={() => sendReaction(emoji)}
            className="text-2xl hover:scale-125 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* 📨 Message Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          className="w-72 px-3 py-2 text-black rounded"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {/* 🪄 Emoji Rain Overlay */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full overflow-hidden z-50">
        {reactions.map((r) => (
          <span
            key={r.id}
            className="absolute text-4xl animate-fall"
            style={{
              left: Math.random() * 90 + "vw",
              animationDuration: 3 + Math.random() * 2 + "s",
            }}
          >
            {r.emoji}
          </span>
        ))}
      </div>

      {/* ✨ CSS for emoji rain */}
      <style>{`
        @keyframes fall {
  0% {
    transform: translateY(-10vh);
    opacity: 1;
  }
  100% {
    transform: translateY(110vh);
    opacity: 0;
  }
}

.animate-fall {
  animation-name: fall;
  animation-timing-function: linear;
  position: absolute;
  top: -50px;
  font-size: 2.5rem;
  pointer-events: none;
  z-index: 9999;
}

      `}</style>
    </div>
  );
};

export default Room;
