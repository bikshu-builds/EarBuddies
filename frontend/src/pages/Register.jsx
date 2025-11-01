import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/auth/register", form);
    login(data);
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded w-80 shadow-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 p-2 rounded bg-gray-700"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-gray-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 rounded bg-gray-700"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-500 w-full py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
