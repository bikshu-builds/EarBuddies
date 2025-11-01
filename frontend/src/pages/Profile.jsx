import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 border-4 border-teal-500 border-b-transparent rounded-full animate-spin-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-cyan-500 border-r-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden mt-10">
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
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
        
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(16, 185, 129, 0.4),
                        0 0 60px rgba(20, 184, 166, 0.2); 
          }
          50% { 
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.6),
                        0 0 80px rgba(20, 184, 166, 0.4); 
          }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes slide-right {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
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
        
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          background-size: 200% 100%;
          animation: shimmer 2.5s infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 1.5s linear infinite;
        }
        
        .animate-scale-pulse {
          animation: scale-pulse 2s ease-in-out infinite;
        }
        
        .animate-slide-right {
          animation: slide-right 0.5s ease-out forwards;
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

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {/* Enhanced Header Section with Avatar */}
        <div className="text-center mb-8 sm:mb-12 animate-fadeIn">
          <div className="relative inline-block mb-6">
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 animate-pulse-ring"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 opacity-20 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
            
            {/* Rotating border */}
            <div className="absolute inset-0 rounded-full border-4 border-emerald-400/30 animate-spin" style={{ animationDuration: '3s' }}></div>
            
            {/* Main avatar */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-5xl sm:text-6xl font-bold shadow-2xl animate-float animate-pulse-glow">
              {user?.username?.charAt(0).toUpperCase() || "U"}
            </div>
            
            {/* Status indicator */}
            <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-4 border-white shadow-xl animate-bounce flex items-center justify-center">
              <span className="text-white text-xl">🎵</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3 animate-slideInUp">
            Welcome, {user?.username || "User"}! 👋
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl font-medium animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            Ready to start your music adventure with EarBuddies?
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            {/* User Details Card */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-emerald-100 hover:border-emerald-300 group overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Profile Details</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="group/item">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Email</label>
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-100 group-hover/item:border-emerald-300 transition-all duration-300 group-hover/item:shadow-md">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-semibold text-sm sm:text-base truncate">{user?.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Logout Card */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 border-2 border-red-100 hover:border-red-300 overflow-hidden group">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <button
                onClick={logout}
                className="relative z-10 w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-5 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group/btn overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                
                <svg className="relative z-10 w-6 h-6 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="relative z-10 text-lg">Logout</span>
              </button>
            </div>
          </div>

          {/* Right Column - Main Actions */}
          <div className="lg:col-span-2 animate-slideInUp" style={{ animationDelay: '0.3s' }}>
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-teal-100 overflow-hidden group">
              {/* Decorative background gradient */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg animate-scale-pulse">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Music Actions</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {/* Enhanced Create Room Card */}
                  <div 
                    onClick={() => navigate("/create-room")}
                    className="group/card relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/50"
                  >
                    {/* Animated overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-emerald-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover/card:scale-150 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 group-hover/card:scale-150 transition-transform duration-700"></div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="w-18 h-18 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover/card:rotate-12 group-hover/card:scale-110 transition-all duration-500 shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      
                      <h3 className="text-3xl font-extrabold text-white mb-4 group-hover/card:translate-x-2 transition-transform duration-300">
                        🎮 Create Room
                      </h3>
                      <p className="text-emerald-50 text-base leading-relaxed mb-6 font-medium">
                        Start a new music session and invite your friends to join
                      </p>
                      
                      <div className="flex items-center text-white font-bold text-lg group-hover/card:translate-x-2 transition-transform duration-300">
                        <span>Get Started</span>
                        <svg className="w-6 h-6 ml-2 group-hover/card:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Join Room Card */}
                  <div 
                    onClick={() => navigate("/join-room")}
                    className="group/card relative overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50"
                  >
                    {/* Animated overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-teal-600 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Decorative circles */}
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 group-hover/card:scale-150 transition-transform duration-700"></div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 group-hover/card:scale-150 transition-transform duration-700"></div>
                    
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="w-18 h-18 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover/card:rotate-12 group-hover/card:scale-110 transition-all duration-500 shadow-lg">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      
                      <h3 className="text-3xl font-extrabold text-white mb-4 group-hover/card:translate-x-2 transition-transform duration-300">
                        🤝 Join Room
                      </h3>
                      <p className="text-cyan-50 text-base leading-relaxed mb-6 font-medium">
                        Enter an existing room and connect with other music lovers
                      </p>
                      
                      <div className="flex items-center text-white font-bold text-lg group-hover/card:translate-x-2 transition-transform duration-300">
                        <span>Join Now</span>
                        <svg className="w-6 h-6 ml-2 group-hover/card:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats Section */}
                <div className="mt-10 pt-8 border-t-2 border-emerald-100">
                  <div className="grid grid-cols-3 gap-5">
                    <div className="text-center group/stat hover:scale-110 transition-all duration-500">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover/stat:rotate-12 transition-transform duration-500 shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Fast</p>
                      <p className="text-xs text-gray-500 mt-1 font-semibold">Quick Setup</p>
                    </div>
                    
                    <div className="text-center group/stat hover:scale-110 transition-all duration-500">
                      <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover/stat:rotate-12 transition-transform duration-500 shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <p className="text-2xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Secure</p>
                      <p className="text-xs text-gray-500 mt-1 font-semibold">Protected</p>
                    </div>
                    
                    <div className="text-center group/stat hover:scale-110 transition-all duration-500">
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover/stat:rotate-12 transition-transform duration-500 shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="text-2xl font-extrabold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">Fun</p>
                      <p className="text-xs text-gray-500 mt-1 font-semibold">Enjoy Music</p>
                    </div>
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