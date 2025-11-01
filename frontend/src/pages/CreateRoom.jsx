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
    { value: 2, icon: "👥", label: "Duo", description: "2 Listeners" },
    { value: 3, icon: "👨‍👩‍👦", label: "Trio", description: "3 Listeners" },
    { value: 4, icon: "👨‍👩‍👧‍👦", label: "Squad", description: "4 Listeners" },
    { value: 5, icon: "🎵", label: "Band", description: "5 Listeners" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Enhanced Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-400 rounded-full animate-float-particle shadow-lg"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-teal-400 rounded-full animate-float-particle animation-delay-1000 shadow-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-float-particle animation-delay-2000 shadow-lg"></div>
        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-emerald-300 rounded-full animate-float-particle animation-delay-3000 shadow-lg"></div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -60px) scale(1.15); }
          50% { transform: translate(-30px, 30px) scale(0.95); }
          75% { transform: translate(60px, 40px) scale(1.1); }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.6; 
          }
          50% { 
            transform: translateY(-30px) translateX(15px) rotate(180deg); 
            opacity: 1; 
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(5deg); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.4),
                        0 0 60px rgba(20, 184, 166, 0.2); 
          }
          50% { 
            box-shadow: 0 0 45px rgba(16, 185, 129, 0.6),
                        0 0 90px rgba(20, 184, 166, 0.4); 
          }
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        
        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.3) rotate(-15deg); opacity: 0; }
          50% { transform: scale(1.05) rotate(5deg); }
          70% { transform: scale(0.9) rotate(-3deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        .animate-blob {
          animation: blob 18s infinite ease-in-out;
        }
        
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
        
        .animate-scale-pulse {
          animation: scale-pulse 2s ease-in-out infinite;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
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

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
        {/* Enhanced Back Button */}
        <div className="mb-6 sm:mb-8 animate-fadeIn">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-all duration-300 transform hover:-translate-x-2 hover:scale-105"
          >
            <div className="w-8 h-8 rounded-lg bg-white shadow-md group-hover:shadow-lg group-hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-bold">Back to Profile</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-8 sm:mb-12 animate-slideInUp">
            <div className="inline-block mb-6 relative">
              {/* Pulsing rings */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 animate-pulse-glow blur-xl"></div>
              
              {/* Rotating border */}
              <div className="absolute inset-0 rounded-3xl border-4 border-emerald-400/30 animate-spin" style={{ animationDuration: '3s' }}></div>
              
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-2xl animate-float transform hover:rotate-6 hover:scale-110 transition-all duration-500 group">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Create New Room
            </h1>
            <p className="text-gray-600 text-base sm:text-xl max-w-2xl mx-auto font-medium">
              Set up your music room and invite your friends to join the vibe
            </p>
          </div>

          {/* Enhanced Main Card */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 border-2 border-emerald-100 animate-slideInUp overflow-hidden" style={{ animationDelay: '0.2s' }}>
            {/* Decorative gradient background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-teal-100/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-100/30 to-teal-100/30 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              {/* Team Size Selection */}
              <div className="mb-8">
                <label className="block text-gray-800 text-xl sm:text-2xl font-extrabold mb-6 flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg animate-scale-pulse">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  Select Room Size
                </label>

                {/* Enhanced Team Size Options Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 mb-6">
                  {teamSizeOptions.map((option, index) => (
                    <div
                      key={option.value}
                      onClick={() => setTeamSize(option.value)}
                      className={`
                        relative cursor-pointer rounded-2xl p-6 sm:p-7 text-center transition-all duration-500 transform hover:scale-110
                        ${teamSize === option.value 
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl shadow-emerald-500/40 scale-105' 
                          : 'bg-emerald-50 text-gray-700 hover:bg-teal-50 border-2 border-emerald-100 hover:border-emerald-300 hover:shadow-lg'
                        }
                        animate-bounce-in
                      `}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {/* Shine effect */}
                      {teamSize === option.value && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rounded-2xl"></div>
                      )}
                      
                      {/* Check mark */}
                      {teamSize === option.value && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                          <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                      
                      <div className="text-5xl sm:text-6xl mb-4 transform transition-transform duration-300 hover:scale-125">{option.icon}</div>
                      <div className={`font-extrabold text-xl mb-1 ${teamSize === option.value ? 'text-white' : 'text-gray-800'}`}>
                        {option.label}
                      </div>
                      <div className={`text-sm font-semibold ${teamSize === option.value ? 'text-emerald-100' : 'text-gray-500'}`}>
                        {option.description}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Custom Input */}
                <div className="mt-8 relative">
                  <label className="block text-gray-600 text-sm font-bold mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Or enter custom room size (2-5 listeners)
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <input
                      type="number"
                      min="2"
                      max="5"
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full pl-20 pr-5 py-5 bg-emerald-50 border-2 border-emerald-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 text-gray-800 font-bold text-xl hover:bg-white hover:border-emerald-300"
                      placeholder="Enter room size"
                    />
                  </div>
                  <p className="mt-3 text-sm text-gray-500 flex items-center gap-2 font-medium">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Choose between 2 to 5 listeners for your room
                  </p>
                </div>
              </div>

              {/* Enhanced Error Message */}
              {error && (
                <div className="mb-6 p-5 bg-red-50 border-l-4 border-red-500 rounded-xl animate-shake shadow-lg">
                  <div className="flex items-center gap-3">
                    <svg className="w-7 h-7 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-700 font-bold text-lg">{error}</p>
                  </div>
                </div>
              )}

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleCreate}
                  disabled={isLoading || teamSize < 2 || teamSize > 5}
                  className="flex-1 relative bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:shadow-emerald-500/50 group overflow-hidden"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3 relative z-10">
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Room...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-3 relative z-10 text-lg">
                      <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Room
                    </span>
                  )}
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="sm:w-auto bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-emerald-200 hover:border-emerald-300 shadow-md hover:shadow-lg"
                >
                  Cancel
                </button>
              </div>

              {/* Enhanced Info Box */}
              <div className="mt-10 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-100 relative overflow-hidden group">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-200/30 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-gray-800 mb-3 text-lg">How it works</h3>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-3 group/item">
                        <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:rotate-12 transition-transform duration-300">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold">Choose your preferred room size</span>
                      </li>
                      <li className="flex items-center gap-3 group/item">
                        <div className="w-6 h-6 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:rotate-12 transition-transform duration-300">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold">Get a unique room code to share</span>
                      </li>
                      <li className="flex items-center gap-3 group/item">
                        <div className="w-6 h-6 bg-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:rotate-12 transition-transform duration-300">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-semibold">Invite friends and start jamming!</span>
                      </li>
                    </ul>
                  </div>
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