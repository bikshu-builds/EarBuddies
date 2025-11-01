import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [teamSize, setTeamSize] = useState(2);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const { data } = await api.post("/rooms/create", { teamSize });
      navigate(`/room/${data.roomCode}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create room");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl mb-4">Create a New Room</h1>
      <input
        type="number"
        min="2"
        max="5"
        value={teamSize}
        onChange={(e) => setTeamSize(e.target.value)}
        className="border rounded p-2 mb-3"
      />
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Room
      </button>
      {error && <p className="text-red-500 mt-3">{error}</p>}
    </div>
  );
};

export default CreateRoom;
