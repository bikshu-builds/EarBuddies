import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { User, Mail, Lock, Sparkles } from "lucide-react";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      login(data);
      navigate("/profile");
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 mt-18">
      {/* Animated background blobs */}
      <div className="absolute w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Parallax cursor effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.08), transparent)`,
        }}
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-indigo-400 rounded-full animate-float shadow-lg"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-float animation-delay-1000 shadow-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-300 rounded-full animate-float animation-delay-2000 shadow-lg"></div>
        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-indigo-300 rounded-full animate-float animation-delay-3000 shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-purple-300 rounded-full animate-float animation-delay-4000 shadow-lg"></div>
      </div>

      {/* Animated Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 bg-white/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4 border border-gray-200"
      >
        {/* Decorative gradient border effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl opacity-20 blur animate-pulse-subtle"></div>
        
        <div className="relative">
          {/* Header with icon */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4 animate-float-gentle">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
              Create an Account ✨
            </h2>
            <p className="text-gray-600 text-sm">Join us and start your music journey</p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl mb-4 text-center text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            {/* Username */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative group"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" size={20} />
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full bg-gray-50 text-gray-800 rounded-xl p-4 pl-12 outline-none border-2 border-gray-200 focus:border-indigo-500 focus:bg-white transition-all duration-200 placeholder-gray-400"
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" size={20} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-gray-50 text-gray-800 rounded-xl p-4 pl-12 outline-none border-2 border-gray-200 focus:border-indigo-500 focus:bg-white transition-all duration-200 placeholder-gray-400"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative group"
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" size={20} />
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full bg-gray-50 text-gray-800 rounded-xl p-4 pl-12 outline-none border-2 border-gray-200 focus:border-indigo-500 focus:bg-white transition-all duration-200 placeholder-gray-400"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden ${
                loading ? "bg-indigo-400 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              } text-white font-bold py-4 rounded-xl mt-2 transition-all duration-300 shadow-lg hover:shadow-xl group`}
              type="submit"
              disabled={loading}
            >
              <span className="relative z-10">
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </span>
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-6"
          >
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-indigo-600 hover:text-purple-600 cursor-pointer font-bold underline decoration-2 underline-offset-2 transition-colors duration-200"
              >
                Login
              </span>
            </p>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -z-10 top-0 right-0 w-32 h-32 bg-purple-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute -z-10 bottom-0 left-0 w-32 h-32 bg-indigo-200 rounded-full filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        </div>
      </motion.div>

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-4xl opacity-15 animate-float-slow text-indigo-400">🎵</div>
        <div className="absolute top-32 right-16 text-3xl opacity-15 animate-float-slow animation-delay-1000 text-purple-400">🎶</div>
        <div className="absolute bottom-32 left-20 text-4xl opacity-15 animate-float-slow animation-delay-2000 text-pink-300">✨</div>
        <div className="absolute bottom-20 right-10 text-3xl opacity-15 animate-float-slow animation-delay-3000 text-indigo-300">🎵</div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(40px, -60px) scale(1.15); }
          50% { transform: translate(-30px, 30px) scale(0.95); }
          75% { transform: translate(40px, 30px) scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-25px) scale(1.1); opacity: 1; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(15deg); }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.05); opacity: 0.3; }
        }
        
        .animate-blob {
          animation: blob 15s infinite ease-in-out;
        }
        
        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 4s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Register;