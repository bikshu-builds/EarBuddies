import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <p>Loading profile...</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {user?.username || "User"}! 👋
      </h1>

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md text-center">
        <p className="text-xl mb-2">
          <strong>Email:</strong> {user?.email}
        </p>
        <p className="text-md mb-6">
          <strong>User ID:</strong> {user?._id}
        </p>

        {/* 🎮 Main Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate("/create-room")}
            className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 text-white font-semibold py-2 px-5 rounded-lg"
          >
            🎮 Create Room
          </button>

          <button
            onClick={() => navigate("/join-room")}
            className="bg-green-600 hover:bg-green-700 transition-all duration-200 transform hover:scale-105 text-white font-semibold py-2 px-5 rounded-lg"
          >
            🤝 Join Room
          </button>
        </div>

        {/* 🚪 Logout */}
        <button
          onClick={logout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      {/* 🔮 Future Sections */}
    </div>
  );
};

export default Profile;
