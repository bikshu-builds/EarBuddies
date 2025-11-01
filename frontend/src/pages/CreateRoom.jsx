import { useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const [teamSize, setTeamSize] = useState(2);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.post("/rooms/create", { teamSize });
      navigate(`/room/${data.roomCode}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create room");
      setIsLoading(false);
    }
  };

  const teamSizeOptions = [
    { value: 2, icon: "👥", label: "Duo", description: "2 Players" },
    { value: 3, icon: "👨‍👩‍👦", label: "Trio", description: "3 Players" },
    { value: 4, icon: "👨‍👩‍👧‍👦", label: "Squad", description: "4 Players" },
    { value: 5, icon: "🎮", label: "Team", description: "5 Players" },
  ];

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
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        {/* Back Button */}
        <div className="mb-6 sm:mb-8 animate-fadeIn">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-all duration-300 transform hover:-translate-x-1"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Profile</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12 animate-slideInUp">
            <div className="inline-block mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float animate-pulse-glow transform hover:rotate-6 transition-transform duration-300">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Create New Room
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Set up your gaming room and invite your friends to join the adventure
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 backdrop-blur-lg bg-opacity-90 border border-gray-100 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            {/* Team Size Selection */}
            <div className="mb-8">
              <label className="block text-gray-800 text-lg sm:text-xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                Select Team Size
              </label>

              {/* Team Size Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {teamSizeOptions.map((option, index) => (
                  <div
                    key={option.value}
                    onClick={() => setTeamSize(option.value)}
                    className={`
                      relative cursor-pointer rounded-2xl p-6 text-center transition-all duration-300 transform hover:scale-105
                      ${teamSize === option.value 
                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-xl scale-105' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-indigo-300'
                      }
                    `}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {teamSize === option.value && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <div className={`font-bold text-lg mb-1 ${teamSize === option.value ? 'text-white' : 'text-gray-800'}`}>
                      {option.label}
                    </div>
                    <div className={`text-sm ${teamSize === option.value ? 'text-indigo-100' : 'text-gray-500'}`}>
                      {option.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom Input */}
              <div className="mt-6">
                <label className="block text-gray-600 text-sm font-semibold mb-3">
                  Or enter custom team size (2-5 players)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    min="2"
                    max="5"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 text-gray-800 font-semibold text-lg"
                    placeholder="Enter team size"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Choose between 2 to 5 players for your team
                </p>
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
                onClick={handleCreate}
                disabled={isLoading || teamSize < 2 || teamSize > 5}
                className="flex-1 relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Room...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3 relative z-10">
                    <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Room
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

            {/* Info Box */}
            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">How it works</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Choose your preferred team size
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Get a unique room code to share
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Invite friends and start playing!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;