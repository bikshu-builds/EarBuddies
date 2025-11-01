import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-4 border-purple-600 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden mt-7">
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
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.3); }
          50% { box-shadow: 0 0 40px rgba(147, 51, 234, 0.5); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {/* Header Section with Avatar */}
        <div className="text-center mb-8 sm:mb-12 animate-fadeIn">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-2xl animate-float animate-pulse-glow">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full border-4 border-white shadow-lg animate-bounce"></div>
          </div>
          
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 animate-slideInUp">
            Welcome, {user?.username || "User"}! 👋
          </h1>
          <p className="text-gray-600 text-base sm:text-lg animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            Ready to start your gaming adventure?
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            {/* User Details Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-lg bg-opacity-90 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Profile Details</h2>
              </div>
              
              <div className="space-y-4">
                <div className="group">
                  <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Email</label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 group-hover:border-indigo-300 transition-all duration-200">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700 font-medium text-sm sm:text-base truncate">{user?.email}</span>
                  </div>
                </div>
                

              </div>
            </div>

            {/* Logout Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-lg bg-opacity-90 hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <button
                onClick={logout}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Right Column - Main Actions */}
          <div className="lg:col-span-2 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 backdrop-blur-lg bg-opacity-90 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center animate-pulse">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Game Actions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Create Room Card */}
                <div 
                  onClick={() => navigate("/create-room")}
                  className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 backdrop-blur-sm">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      🎮 Create Room
                    </h3>
                    <p className="text-indigo-100 text-sm leading-relaxed">
                      Start a new gaming session and invite your friends to join
                    </p>
                    
                    <div className="mt-6 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Get Started</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Join Room Card */}
                <div 
                  onClick={() => navigate("/join-room")}
                  className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300 backdrop-blur-sm">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
                      🤝 Join Room
                    </h3>
                    <p className="text-green-100 text-sm leading-relaxed">
                      Enter an existing room and connect with other players
                    </p>
                    
                    <div className="mt-6 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span>Join Now</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats or Additional Info Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">Fast</p>
                    <p className="text-xs text-gray-500 mt-1">Quick Setup</p>
                  </div>
                  
                  <div className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">Secure</p>
                    <p className="text-xs text-gray-500 mt-1">Protected</p>
                  </div>
                  
                  <div className="text-center group hover:scale-110 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:rotate-12 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">Fun</p>
                    <p className="text-xs text-gray-500 mt-1">Enjoy Gaming</p>
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

export default Profile;