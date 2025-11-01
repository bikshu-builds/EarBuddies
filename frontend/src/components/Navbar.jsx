import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menu, X, Music, User, LogOut, LogIn, UserPlus } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-emerald-100' 
          : 'bg-white/90 backdrop-blur-lg shadow-lg'
      }`}
    >
      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 animate-gradient-x"></div>
      
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-3 md:py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 group relative"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-emerald-400 rounded-xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse-glow"></div>
            
            {/* Icon container with enhanced animations */}
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-2.5 rounded-xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-emerald-500/50">
              <Music className="text-white transform group-hover:rotate-12 transition-transform duration-500" size={22} />
            </div>
            
            {/* Orbiting particles */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-400 rounded-full animate-orbit-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-orbit-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-cyan-600 group-hover:via-teal-600 group-hover:to-emerald-600 transition-all duration-700 tracking-tight">
            EarBuddies
          </span>
          
          {/* Underline effect */}
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
          {user ? (
            <>
              <Link
                to="/profile"
                className="relative flex items-center space-x-2 px-5 py-2.5 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-semibold group overflow-hidden"
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                
                <User size={19} className="relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <span className="relative z-10">{user.username}</span>
                
                {/* Bottom border animation */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-500"></div>
              </Link>
              
              <button
                onClick={logout}
                className="relative flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/50 text-white transform hover:scale-105 hover:-translate-y-1 overflow-hidden group"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <LogOut size={18} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative z-10">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="relative flex items-center space-x-2 px-5 py-2.5 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-semibold group overflow-hidden"
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                
                <LogIn size={19} className="relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" />
                <span className="relative z-10">Login</span>
                
                {/* Bottom border animation */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-500"></div>
              </Link>
              
              <Link
                to="/register"
                className="relative flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/50 text-white transform hover:scale-105 hover:-translate-y-1 overflow-hidden group"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                
                <UserPlus size={18} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button with enhanced animations */}
        <button
          className={`md:hidden p-2.5 rounded-xl transition-all duration-300 relative overflow-hidden ${
            menuOpen 
              ? 'bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-500/20' 
              : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* Button background pulse */}
          <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl transition-opacity duration-300 ${menuOpen ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
          
          {menuOpen ? (
            <X size={24} className="relative z-10 animate-rotate-in" />
          ) : (
            <Menu size={24} className="relative z-10 animate-scale-in" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu with enhanced animations */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-2xl border-t border-emerald-100 shadow-2xl animate-slideDown">
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
          
          <div className="flex flex-col space-y-2 px-4 py-5">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="relative flex items-center space-x-3 px-5 py-4 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-semibold group overflow-hidden animate-fadeInUp"
                  style={{ animationDelay: '0.1s' }}
                >
                  {/* Slide in background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <User size={20} className="text-white" />
                  </div>
                  <span className="relative z-10 flex-1">{user.username}</span>
                  
                  {/* Arrow indicator */}
                  <div className="relative z-10 w-2 h-2 border-t-2 border-r-2 border-emerald-500 transform rotate-45 group-hover:translate-x-1 transition-transform duration-300"></div>
                </Link>
                
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="relative flex items-center justify-center space-x-3 bg-gradient-to-r from-red-500 to-red-600 py-4 rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all duration-300 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/30 overflow-hidden group animate-fadeInUp"
                  style={{ animationDelay: '0.2s' }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  <LogOut size={20} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="relative flex items-center space-x-3 px-5 py-4 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 font-semibold group overflow-hidden animate-fadeInUp"
                  style={{ animationDelay: '0.1s' }}
                >
                  {/* Slide in background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  
                  <div className="relative z-10 bg-gradient-to-br from-emerald-500 to-teal-600 p-2 rounded-lg group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    <LogIn size={20} className="text-white" />
                  </div>
                  <span className="relative z-10 flex-1">Login</span>
                  
                  {/* Arrow indicator */}
                  <div className="relative z-10 w-2 h-2 border-t-2 border-r-2 border-emerald-500 transform rotate-45 group-hover:translate-x-1 transition-transform duration-300"></div>
                </Link>
                
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="relative flex items-center justify-center space-x-3 bg-gradient-to-r from-emerald-500 to-teal-600 py-4 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 text-white shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 overflow-hidden group animate-fadeInUp"
                  style={{ animationDelay: '0.2s' }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  <UserPlus size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">Register</span>
                </Link>
              </>
            )}
          </div>
          
          {/* Decorative bottom element */}
          <div className="h-2 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10"></div>
        </div>
      )}

      {/* Custom animations */}
      <style>{`
        @keyframes slideDown {
          0% { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes rotate-in {
          0% { 
            transform: rotate(-180deg) scale(0.5);
            opacity: 0;
          }
          100% { 
            transform: rotate(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          0% { 
            transform: scale(0.5);
            opacity: 0;
          }
          100% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        @keyframes orbit-1 {
          0% {
            transform: rotate(0deg) translateX(20px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(20px) rotate(-360deg);
          }
        }
        
        @keyframes orbit-2 {
          0% {
            transform: rotate(0deg) translateX(20px) rotate(0deg);
          }
          100% {
            transform: rotate(-360deg) translateX(20px) rotate(360deg);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .animate-rotate-in {
          animation: rotate-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-orbit-1 {
          animation: orbit-1 3s linear infinite;
        }
        
        .animate-orbit-2 {
          animation: orbit-2 4s linear infinite;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;