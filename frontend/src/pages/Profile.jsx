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
      {/* Background blobs + particles (unchanged) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 max-w-7xl flex flex-col lg:flex-row gap-8">
        {/* ========== LEFT SIDEBAR ========== */}
        <aside className="w-full lg:w-1/3 space-y-6 animate-fadeIn">
          {/* Avatar + Greeting */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 opacity-20 animate-pulse-ring"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 opacity-20 animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
              <div className="absolute inset-0 rounded-full border-4 border-emerald-400/30 animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-5xl sm:text-6xl font-bold shadow-2xl animate-float animate-pulse-glow">
                {user?.username?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-4 border-white shadow-xl animate-bounce flex items-center justify-center">
                <span className="text-white text-xl">🎵</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              {user?.username || "User"}
            </h1>
            <p className="text-gray-600 text-lg font-medium">
              Music Explorer
            </p>
          </div>

          {/* Profile Details */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 border-2 border-emerald-100 hover:border-emerald-300 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Profile Details
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Email
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-semibold text-sm sm:text-base truncate">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* ========== MAIN PANEL ========== */}
        <main className="flex-1 space-y-8 animate-fadeIn">
          {/* Music Actions Section */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-teal-100 overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg animate-scale-pulse">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Music Actions
                </h2>
              </div>

              {/* Two cards side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div onClick={() => navigate("/create-room")} className="group/card relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/50">
                  <div className="relative z-10">
                    <div className="w-18 h-18 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-4">🎮 Create Room</h3>
                    <p className="text-emerald-50 text-base leading-relaxed mb-6 font-medium">
                      Start a new music session and invite your friends
                    </p>
                    <div className="flex items-center text-white font-bold text-lg">
                      <span>Get Started</span>
                      <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div onClick={() => navigate("/join-room")} className="group/card relative overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-8 cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50">
                  <div className="relative z-10">
                    <div className="w-18 h-18 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-extrabold text-white mb-4">🤝 Join Room</h3>
                    <p className="text-cyan-50 text-base leading-relaxed mb-6 font-medium">
                      Enter an existing room and connect with music lovers
                    </p>
                    <div className="flex items-center text-white font-bold text-lg">
                      <span>Join Now</span>
                      <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-6 border-2 border-emerald-100">
            <div className="grid grid-cols-3 gap-5">
              {[
                { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "Fast", subtitle: "Quick Setup" },
                { icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", title: "Secure", subtitle: "Protected" },
                { icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Fun", subtitle: "Enjoy Music" },
              ].map((item, i) => (
                <div key={i} className="text-center hover:scale-110 transition-all duration-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <p className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1 font-semibold">{item.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
