import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <Link to="/" className="text-xl font-bold text-blue-400">SyncWave</Link>
      <div>
        {user ? (
          <>
            <Link to="/profile" className="mr-4">{user.username}</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register" className="bg-blue-500 px-3 py-1 rounded">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
