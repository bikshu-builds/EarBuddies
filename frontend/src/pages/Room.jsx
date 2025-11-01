import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";
import socket from "../utils/socket";
import dayjs from "dayjs";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMemePicker, setShowMemePicker] = useState(false);
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);

  const audioRef = useRef(null);
  const chatEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🧭 Scroll chat to bottom when new message arrives
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📦 Load data & connect socket
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [roomRes, msgRes, songsRes, memesRes] = await Promise.all([
          api.get(`/rooms/${code}`),
          api.get(`/messages/${code}`),
          axios.get("http://localhost:5000/api/music/songs?term=telugu"),
          axios.get("https://api.imgflip.com/get_memes"),
        ]);
        setRoom(roomRes.data);
        setMessages(msgRes.data);
        setSongs(songsRes.data);
        setMemes(
          memesRes.data.data.memes.filter((m) =>
            /(telugu|fun|meme)/i.test(m.name)
          )
        );
      } catch (err) {
        console.error("❌ Failed to load room data:", err);
      }
    };

    loadInitialData();
    socket.emit("join_room", code);

    // 🔹 Listen for socket events
    socket.on("receive_message", (msg) => setMessages((p) => [...p, msg]));
    socket.on("user_typing", (u) =>
      setTypingUsers((p) => (p.includes(u) ? p : [...p, u]))
    );
    socket.on("user_stopped_typing", (u) =>
      setTypingUsers((p) => p.filter((x) => x !== u))
    );

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

    socket.on("receive_reaction", ({ emoji }) => {
      triggerEmojiRain(emoji);
    });

    return () => {
      socket.emit("leave_room", code);
      socket.off();
    };
  }, [code]);

  // ✍️ Handle typing indicator
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

  // 💬 Send message or meme
  const sendMessage = () => {
    if ((!newMessage.trim() && !selectedMeme) || !user?._id) return;

    const content = selectedMeme
      ? `[MEME](${selectedMeme.url})`
      : newMessage.trim();

    socket.emit("send_message", { roomCode: code, user, content });
    setNewMessage("");
    setSelectedMeme(null);
    setShowMemePicker(false);
  };

  // 🎵 Select a song (sync for all)
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

  // ⏯️ Toggle Play/Pause
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

  // 🕒 Track playback
  useEffect(() => {
    const timer = setInterval(() => {
      if (audioRef.current && isPlaying)
        setCurrentTime(audioRef.current.currentTime);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // 🌧️ Emoji Rain Effect
  const triggerEmojiRain = (emoji) => {
    const id = Date.now();
    setReactions((prev) => [...prev, { id, emoji }]);
    setTimeout(
      () => setReactions((prev) => prev.filter((r) => r.id !== id)),
      4000
    );
  };

  const sendReaction = (emoji) => {
    triggerEmojiRain(emoji);
    socket.emit("send_reaction", { roomCode: code, emoji, username: user.username });
  };

  if (!room) return <p className="text-center mt-10 text-white">Loading...</p>;

  return (
    <div className="flex flex-col items-center mt-10 text-white relative overflow-hidden">
      <h1 className="text-3xl mb-2 font-bold">Room: {room.roomCode}</h1>

      {/* 🎧 Music Player */}
      <div className="bg-gray-800 p-4 rounded-lg w-[450px] mb-4">
        <h2 className="text-xl font-semibold mb-2">🎶 Shared Player</h2>
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

      {/* 🎵 Song List */}
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

      {/* 💬 Chat Section */}
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
              {msg.content.startsWith("[MEME](") ? (
                <img
                  src={msg.content.slice(7, -1)}
                  alt="meme"
                  className="w-48 rounded-lg inline-block"
                />
              ) : (
                msg.content
              )}
            </div>
            <small className="text-gray-400 text-sm">
              {dayjs(msg.timestamp).format("HH:mm")}
            </small>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 👀 Typing */}
      {typingUsers.length > 0 && (
        <p className="text-sm text-gray-400 mb-2">
          {typingUsers.join(", ")}{" "}
          {typingUsers.length > 1 ? "are typing..." : "is typing..."}
        </p>
      )}

      {/* 🎉 Reactions */}
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

      {/* 📤 Message Input */}
      <div className="flex space-x-2 relative">
        <button
          onClick={() => {
            setShowEmojiPicker((p) => !p);
            setShowMemePicker(false);
          }}
          className="bg-gray-500 px-3 rounded"
        >
          😀
        </button>
        <button
          onClick={() => {
            setShowMemePicker((p) => !p);
            setShowEmojiPicker(false);
          }}
          className="bg-gray-500 px-3 rounded"
        >
          🖼️
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          className="w-64 px-3 py-2 text-black rounded"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
        >
          Send
        </button>

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <div className="absolute bottom-12 left-0 z-50">
            <EmojiPicker
              onEmojiClick={(emoji) => setNewMessage((p) => p + emoji.emoji)}
              theme="dark"
            />
          </div>
        )}
      </div>

      {/* 🌧️ Emoji Rain */}
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

      {/* 🎨 Emoji Rain Animation */}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh); opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          position: absolute;
          top: -50px;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Room;
