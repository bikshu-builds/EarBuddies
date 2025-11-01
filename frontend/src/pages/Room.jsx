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

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-purple-600 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden mt-18">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.5); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
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
        @keyframes message-pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-message-pop {
          animation: message-pop 0.3s ease-out;
        }
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress-bar 30s linear;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fadeIn">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-float">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Room: {room.roomCode}
          </h1>
          <p className="text-gray-600">Share this code with your friends to join</p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Left Column - Music Player & Songs */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 🎵 Music Player */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 backdrop-blur-lg bg-opacity-90 border border-gray-100 animate-slideInUp">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">🎶 Shared Music Player</h2>
              </div>

              {currentSong ? (
                <div className="text-center">
                  <div className="relative inline-block mb-6 group">
                    <img
                      src={currentSong.artworkUrl100}
                      alt={currentSong.trackName}
                      className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-800 mb-2">{currentSong.trackName}</h3>
                  <p className="text-gray-600 mb-4">{currentSong.artistName}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{Math.floor(currentTime)}s</span>
                      <span>30s</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(currentTime / 30) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <audio ref={audioRef} hidden />
                  
                  <button
                    onClick={togglePlay}
                    className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <span className="flex items-center justify-center gap-3">
                      {isPlaying ? (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Pause
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                          Play
                        </>
                      )}
                    </span>
                  </button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-lg">No song playing</p>
                  <p className="text-gray-500 text-sm mt-2">Choose one from below 👇</p>
                </div>
              )}
            </div>

            {/* 🎧 Songs Grid */}
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 backdrop-blur-lg bg-opacity-90 border border-gray-100 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">🎧 Available Songs</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {songs.slice(0, 8).map((song, i) => (
                  <div
                    key={i}
                    onClick={() => handleSongSelect(song)}
                    className="group bg-gray-50 rounded-2xl p-3 cursor-pointer hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 border-2 border-gray-200 hover:border-indigo-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <div className="relative mb-3 overflow-hidden rounded-xl">
                      <img
                        src={song.artworkUrl100}
                        alt={song.trackName}
                        className="w-full rounded-xl transform group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <p className="font-semibold text-sm text-gray-800 truncate mb-1">{song.trackName}</p>
                    <p className="text-gray-500 text-xs truncate">{song.artistName}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Chat */}
          <div className="lg:col-span-1 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-3xl shadow-xl backdrop-blur-lg bg-opacity-90 border border-gray-100 flex flex-col h-[calc(100vh-12rem)] sticky top-6">
              
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">💬 Chat</h2>
                    <p className="text-xs text-gray-500">Stay connected with your team</p>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-400">No messages yet...</p>
                    <p className="text-gray-500 text-sm mt-2">Be the first to say hi! 👋</p>
                  </div>
                )}
                
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender?._id === user?._id ? 'justify-end' : 'justify-start'} animate-message-pop`}
                  >
                    <div className={`max-w-[80%] ${msg.sender?._id === user?._id ? 'order-2' : 'order-1'}`}>
                      <div className={`rounded-2xl px-4 py-3 ${
                        msg.sender?._id === user?._id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className={`text-xs font-semibold mb-1 ${msg.sender?._id === user?._id ? 'text-indigo-100' : 'text-gray-600'}`}>
                          {msg.sender?.username || "Unknown"}
                        </p>
                        <p className="text-sm break-words">{msg.content}</p>
                      </div>
                      <p className={`text-xs text-gray-400 mt-1 ${msg.sender?._id === user?._id ? 'text-right' : 'text-left'}`}>
                        {dayjs(msg.timestamp).format("HH:mm")}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Typing Indicator */}
              {typingUsers.length > 0 && (
                <div className="px-6 py-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>
                      {typingUsers.join(", ")}{" "}
                      {typingUsers.length > 1 ? "are typing..." : "is typing..."}
                    </span>
                  </div>
                </div>
              )}

              {/* Emoji Reactions */}
              <div className="px-6 py-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 font-semibold mb-3">Quick Reactions</p>
                <div className="flex flex-wrap gap-2">
                  {["❤️", "😂", "🔥", "🎵", "👏", "😍"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => sendReaction(emoji)}
                      className="w-10 h-10 bg-gray-100 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 rounded-xl flex items-center justify-center text-xl transition-all duration-300 transform hover:scale-125 active:scale-95 border-2 border-gray-200 hover:border-indigo-300"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={handleTyping}
                    className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-400"
                    placeholder="Type your message..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default Room;