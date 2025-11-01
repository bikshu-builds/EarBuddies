import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.post("/rooms/join", { code });
      navigate(`/room/${data.roomCode}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to join room");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
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
          50% { transform: translateY(-20px); }
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
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8 animate-fadeIn">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-600 hover:text-green-600 transition-all duration-300 transform hover:-translate-x-1"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Profile</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 animate-slideInUp">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float animate-pulse-glow transform hover:rotate-6 transition-transform duration-300">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-3">
              Join a Room
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto">
              Enter the room code shared by your friend to connect and play together
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 backdrop-blur-lg bg-opacity-90 border border-gray-100 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            {/* Room Code Input */}
            <div className="mb-8">
              <label className="block text-gray-800 text-lg sm:text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                Enter Room Code
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="ENTER-ROOM-CODE"
                  className="w-full pl-14 pr-4 py-5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 text-gray-800 font-bold text-lg sm:text-xl tracking-wider placeholder-gray-400 uppercase"
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && code && handleJoin()}
                />
                {code && (
                  <button
                    onClick={() => setCode("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Code is automatically converted to uppercase
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleJoin}
                disabled={isLoading || !code}
                className="flex-1 relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Joining Room...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3 relative z-10">
                    <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Join Room
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate(-1)}
                className="sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-gray-200"
              >
                Cancel
              </button>
            </div>

            {/* Quick Tips Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Quick Tips</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Ask your friend for their room code
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Room codes are case-insensitive
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Press Enter to join quickly
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Visual Separator */}
            <div className="mt-8 flex items-center justify-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <div className="px-4 text-sm text-gray-400 font-medium">OR</div>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Alternative Action */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Don't have a room code yet?</p>
              <button
                onClick={() => navigate("/create-room")}
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors duration-200 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Your Own Room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;