import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    try {
      const { data } = await api.post("/rooms/join", { code });
      navigate(`/room/${data.roomCode}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join room");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl mb-4">Join a Room</h1>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Enter room code"
        className="border rounded p-2 mb-3"
      />
      <button
        onClick={handleJoin}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Join Room
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default JoinRoom;
