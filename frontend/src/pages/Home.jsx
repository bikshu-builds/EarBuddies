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
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 text-gray-800 mt-17">
      {/* Animated background blobs with enhanced movements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

      {/* Parallax cursor effect with emerald theme */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.12), transparent)`,
        }}
      ></div>

      {/* Enhanced floating particles with complex animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-float-complex shadow-lg"></div>
        <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full animate-float-complex animation-delay-1000 shadow-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-gradient-to-br from-cyan-400 to-emerald-500 rounded-full animate-float-complex animation-delay-2000 shadow-lg"></div>
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full animate-float-complex animation-delay-3000 shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-br from-teal-300 to-cyan-400 rounded-full animate-float-complex animation-delay-4000 shadow-lg"></div>
      </div>

      {/* Main content */}
      <div className={`z-10 text-center px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Enhanced animated logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            {/* Multiple layered glow effects */}
            <div className="absolute inset-0 bg-emerald-300 rounded-full blur-2xl opacity-50 animate-pulse-glow"></div>
            <div className="absolute inset-0 bg-teal-300 rounded-full blur-3xl opacity-40 animate-pulse-glow animation-delay-1000"></div>
            
            {/* Rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-emerald-400/30 animate-spin-slow"></div>
            <div className="absolute inset-0 rounded-full border-4 border-teal-400/30 animate-spin-reverse"></div>
            
            {/* Main icon container */}
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-6 sm:p-8 rounded-full shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-500 animate-float-gentle group">
              <Music className="w-14 h-14 sm:w-20 sm:h-20 text-white drop-shadow-2xl animate-bounce-slow group-hover:rotate-12 transition-transform duration-500" />
              
              {/* Orbiting dots */}
              <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-400 rounded-full animate-orbit-1"></div>
              <div className="absolute bottom-0 left-0 w-3 h-3 bg-emerald-400 rounded-full animate-orbit-2"></div>
            </div>
          </div>
        </div>

        {/* Title with enhanced gradient animation */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-sm animate-gradient-text">
          Welcome to EarBuddies 🎵
        </h1>

        <p className="text-gray-600 text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 sm:mb-12 max-w-3xl mx-auto animate-fade-in-up font-medium">
          Join, sync, and vibe to music together.
        </p>

        {/* Enhanced feature highlights with staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-7 mb-10 sm:mb-14 max-w-5xl mx-auto">
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-emerald-100 shadow-xl transform hover:scale-105 hover:shadow-2xl hover:border-emerald-300 transition-all duration-500 animate-slide-up group overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="text-5xl sm:text-6xl mb-4 animate-bounce-subtle transform group-hover:scale-110 transition-transform duration-300">🎧</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Real-Time Sync</h3>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Listen together in perfect harmony</p>
            </div>
          </div>
          
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-teal-100 shadow-xl transform hover:scale-105 hover:shadow-2xl hover:border-teal-300 transition-all duration-500 animate-slide-up animation-delay-200 group overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="text-5xl sm:text-6xl mb-4 animate-bounce-subtle animation-delay-1000 transform group-hover:scale-110 transition-transform duration-300">🌍</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Anywhere</h3>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Connect from any corner of the world</p>
            </div>
          </div>
          
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-cyan-100 shadow-xl transform hover:scale-105 hover:shadow-2xl hover:border-cyan-300 transition-all duration-500 animate-slide-up animation-delay-400 sm:col-span-1 col-span-1 group overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <div className="relative z-10">
              <div className="text-5xl sm:text-6xl mb-4 animate-bounce-subtle animation-delay-2000 transform group-hover:scale-110 transition-transform duration-300">👥</div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-800 bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">With Friends</h3>
              <p className="text-sm sm:text-base text-gray-600 font-medium">Share your favorite tracks instantly</p>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-10">
          <a
            href="/register"
            className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 px-10 py-5 rounded-full font-bold text-lg sm:text-xl text-white shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 overflow-hidden animate-pulse-subtle"
          >
            <span className="relative z-10">Get Started</span>
            
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Multiple shimmer effects */}
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            <div className="absolute inset-0 animate-shimmer-slow bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent"></div>
          </a>
          
          <a
            href="/login"
            className="group relative border-3 border-emerald-500 bg-white/70 backdrop-blur-md px-10 py-5 rounded-full font-bold text-lg sm:text-xl text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-600 hover:text-white hover:border-emerald-600 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-lg hover:shadow-xl overflow-hidden"
          >
            <span className="relative z-10">Login</span>
            
            {/* Slide in background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </a>
        </div>
      </div>

      {/* Enhanced floating music notes with rotation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-5xl sm:text-6xl opacity-20 animate-float-slow-rotate text-emerald-400">🎵</div>
        <div className="absolute top-32 right-16 text-4xl sm:text-5xl opacity-20 animate-float-slow-rotate animation-delay-1000 text-teal-400">🎶</div>
        <div className="absolute bottom-32 left-20 text-6xl sm:text-7xl opacity-20 animate-float-slow-rotate animation-delay-2000 text-cyan-300">🎵</div>
        <div className="absolute bottom-20 right-10 text-5xl sm:text-6xl opacity-20 animate-float-slow-rotate animation-delay-3000 text-emerald-300">🎶</div>
        <div className="absolute top-1/2 left-1/5 text-3xl sm:text-4xl opacity-15 animate-float-slow-rotate animation-delay-4000 text-teal-300">🎵</div>
        <div className="absolute top-2/3 right-1/5 text-4xl sm:text-5xl opacity-15 animate-float-slow-rotate animation-delay-5000 text-cyan-400">🎶</div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -70px) scale(1.2); }
          50% { transform: translate(-40px, 40px) scale(0.9); }
          75% { transform: translate(50px, 40px) scale(1.15); }
        }
        
        @keyframes float-complex {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); 
            opacity: 0.6; 
          }
          25% { 
            transform: translateY(-15px) translateX(10px) scale(1.1) rotate(90deg); 
            opacity: 0.9; 
          }
          50% { 
            transform: translateY(-30px) translateX(0px) scale(1.2) rotate(180deg); 
            opacity: 1; 
          }
          75% { 
            transform: translateY(-15px) translateX(-10px) scale(1.1) rotate(270deg); 
            opacity: 0.9; 
          }
        }
        
        @keyframes float-slow-rotate {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-50px) rotate(180deg); 
          }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes gradient-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(60px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.15);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%) skewX(15deg); }
          100% { transform: translateX(200%) skewX(15deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes orbit-1 {
          0% {
            transform: rotate(0deg) translateX(35px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(35px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-2 {
          0% {
            transform: rotate(0deg) translateX(35px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(35px) rotate(360deg);
          }
        }
        
        .animate-blob {
          animation: blob 20s infinite ease-in-out;
        }
        
        .animate-float-complex {
          animation: float-complex 4s ease-in-out infinite;
        }
        
        .animate-float-slow-rotate {
          animation: float-slow-rotate 12s ease-in-out infinite;
        }
        
        .animate-float-gentle {
          animation: float-gentle 5s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3.5s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2.5s ease-in-out infinite;
        }
        
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-text 8s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 5s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-shimmer-slow {
          animation: shimmer-slow 4s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }
        
        .animate-orbit-1 {
          animation: orbit-1 4s linear infinite;
        }
        
        .animate-orbit-2 {
          animation: orbit-2 5s linear infinite;
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
        
        .animation-delay-5000 {
          animation-delay: 5s;
        }
      `}</style>
    </div>
  );
};

export default Home;