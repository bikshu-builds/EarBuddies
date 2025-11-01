import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/axios";
import { Mail, Lock, Sparkles } from "lucide-react";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const { data } = await api.post("/auth/login", form);
      login(data);
      navigate("/profile");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 mt-18">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Parallax cursor effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.12), transparent)`,
        }}
      ></div>

      {/* Floating particles with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-lg"
        ></motion.div>
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            x: [0, -20, 0],
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-1/3 right-1/4 w-5 h-5 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full shadow-lg"
        ></motion.div>
        <motion.div 
          animate={{ 
            y: [0, -35, 0],
            x: [0, 25, 0],
            scale: [1, 1.4, 1],
            rotate: [0, 270, 360]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full shadow-lg"
        ></motion.div>
        <motion.div 
          animate={{ 
            y: [0, 45, 0],
            x: [0, -30, 0],
            scale: [1, 1.25, 1],
            rotate: [0, -270, -360]
          }}
          transition={{ 
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full shadow-lg"
        ></motion.div>
        
        {/* Additional smaller particles */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/5 w-2 h-2 bg-teal-400 rounded-full"
        ></motion.div>
        <motion.div 
          animate={{ 
            y: [0, 25, 0],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute top-2/3 right-1/5 w-3 h-3 bg-cyan-300 rounded-full"
        ></motion.div>
      </div>

      {/* Animated Card with enhanced entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 50, rotateX: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        transition={{ 
          duration: 0.7, 
          ease: [0.16, 1, 0.3, 1],
          type: "spring",
          stiffness: 100
        }}
        className="relative z-10 bg-white/95 backdrop-blur-2xl p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md mx-4 border border-emerald-100"
      >
        {/* Animated gradient border effect */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl opacity-30 blur animate-pulse-subtle"
        ></motion.div>
        
        <div className="relative">
          {/* Header with animated icon */}
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="text-center mb-8"
          >
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl mb-5 relative overflow-hidden"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl"
              ></motion.div>
              <Sparkles className="w-10 h-10 text-white relative z-10" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3"
            >
              Welcome Back 👋
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-sm font-medium"
            >
              Sign in to continue your music journey
            </motion.p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-red-50 border-2 border-red-200 text-red-600 p-4 rounded-2xl mb-5 text-center text-sm font-semibold shadow-sm"
            >
              <motion.div
                animate={{ x: [-2, 2, -2, 2, 0] }}
                transition={{ duration: 0.4 }}
              >
                {error}
              </motion.div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            {/* Email with enhanced animations */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 100
              }}
              className="relative group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-all duration-300"
                >
                  <Mail size={22} />
                </motion.div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-emerald-50 text-gray-800 rounded-2xl p-4 pl-14 outline-none border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white transition-all duration-300 placeholder-gray-400 font-medium shadow-sm focus:shadow-md"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Password with enhanced animations */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
              className="relative group"
            >
              <label className="block text-sm font-bold text-gray-700 mb-2 tracking-wide">
                Password
              </label>
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-all duration-300"
                >
                  <Lock size={22} />
                </motion.div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-emerald-50 text-gray-800 rounded-2xl p-4 pl-14 outline-none border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white transition-all duration-300 placeholder-gray-400 font-medium shadow-sm focus:shadow-md"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
            </motion.div>

            {/* Enhanced Button with ripple effect */}
            <motion.button
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.7,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.03, 
                y: -3,
                boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.4)"
              }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden ${
                loading ? "bg-emerald-400 cursor-not-allowed" : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              } text-white font-bold py-5 rounded-2xl mt-2 transition-all duration-300 shadow-xl group`}
              type="submit"
              disabled={loading}
            >
              {/* Animated shine effect */}
              {!loading && (
                <motion.div
                  animate={{ 
                    x: [-200, 200],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: 1
                  }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                ></motion.div>
              )}
              
              <span className="relative z-10 flex items-center justify-center text-lg">
                {loading ? (
                  <span className="flex items-center">
                    <motion.svg 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-6 w-6 mr-3" 
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </motion.svg>
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </span>
              
              {/* Hover gradient overlay */}
              {!loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 transition-opacity duration-300"
                ></motion.div>
              )}
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600 text-sm font-medium">
              Don't have an account?{" "}
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text cursor-pointer font-bold underline decoration-2 underline-offset-4 hover:underline-offset-2 transition-all duration-200 inline-block"
              >
                Sign up
              </motion.span>
            </p>
          </motion.div>

          {/* Decorative animated elements */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -z-10 top-0 right-0 w-40 h-40 bg-emerald-200 rounded-full filter blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute -z-10 bottom-0 left-0 w-40 h-40 bg-teal-200 rounded-full filter blur-3xl"
          ></motion.div>
        </div>
      </motion.div>

      {/* Custom animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -70px) scale(1.2); }
          50% { transform: translate(-40px, 40px) scale(0.9); }
          75% { transform: translate(50px, 40px) scale(1.15); }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.08); opacity: 0.4; }
        }
        
        .animate-blob {
          animation: blob 18s infinite ease-in-out;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 5s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Login;