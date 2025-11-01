import { useState, useEffect } from "react";
import { Music } from "lucide-react";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-800 mt-17 ">
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

      {/* Main content */}
      <div className={`z-10 text-center px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Animated logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-300 rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-5 sm:p-7 rounded-full shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-300 animate-float-gentle">
              <Music className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-2xl animate-bounce-slow" />
            </div>
          </div>
        </div>

        {/* Title with gradient animation */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm animate-gradient-text">
          Welcome to SyncWave 🎵
        </h1>

        <p className="text-gray-600 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-in-up font-medium">
          Join, sync, and vibe to music together.
        </p>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7 mb-10 sm:mb-14 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl transform hover:scale-105 hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 animate-slide-up">
            <div className="text-4xl sm:text-5xl mb-3 animate-bounce-subtle">🎧</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">Real-Time Sync</h3>
            <p className="text-sm sm:text-base text-gray-600">Listen together in perfect harmony</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl transform hover:scale-105 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 animate-slide-up animation-delay-200">
            <div className="text-4xl sm:text-5xl mb-3 animate-bounce-subtle animation-delay-1000">🌍</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">Anywhere</h3>
            <p className="text-sm sm:text-base text-gray-600">Connect from any corner of the world</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-xl transform hover:scale-105 hover:shadow-2xl hover:border-pink-300 transition-all duration-300 animate-slide-up animation-delay-400 sm:col-span-1 col-span-1">
            <div className="text-4xl sm:text-5xl mb-3 animate-bounce-subtle animation-delay-2000">👥</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800">With Friends</h3>
            <p className="text-sm sm:text-base text-gray-600">Share your favorite tracks instantly</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-10">
          <a
            href="/register"
            className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-5 rounded-full font-bold text-lg sm:text-xl text-white shadow-2xl hover:shadow-indigo-400/50 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 overflow-hidden animate-pulse-subtle"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </a>
          <a
            href="/login"
            className="group border-3 border-indigo-600 bg-white/50 backdrop-blur-sm px-10 py-5 rounded-full font-bold text-lg sm:text-xl text-indigo-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-xl"
          >
            Login
          </a>
        </div>

        {/* Stats Section */}
      
      </div>

      {/* Floating music notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-4xl sm:text-5xl opacity-20 animate-float-slow text-indigo-400">🎵</div>
        <div className="absolute top-32 right-16 text-3xl sm:text-4xl opacity-20 animate-float-slow animation-delay-1000 text-purple-400">🎶</div>
        <div className="absolute bottom-32 left-20 text-5xl sm:text-6xl opacity-20 animate-float-slow animation-delay-2000 text-pink-300">🎵</div>
        <div className="absolute bottom-20 right-10 text-4xl sm:text-5xl opacity-20 animate-float-slow animation-delay-3000 text-indigo-300">🎶</div>
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
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes count {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
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
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 6s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-count {
          animation: count 0.8s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
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

export default Home;