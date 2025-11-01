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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200' 
          : 'bg-white/80 backdrop-blur-md shadow-lg'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-3 md:py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-400 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Music className="text-white" size={20} />
            </div>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-indigo-600 transition-all duration-300">
            SyncWave
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-semibold group"
              >
                <User size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span>{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl text-white transform hover:scale-105 hover:-translate-y-0.5"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-semibold group"
              >
                <LogIn size={18} className="group-hover:scale-110 transition-transform duration-200" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-white transform hover:scale-105 hover:-translate-y-0.5"
              >
                <UserPlus size={18} />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
            menuOpen 
              ? 'bg-indigo-100 text-indigo-600' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={24} className="animate-rotate-in" />
          ) : (
            <Menu size={24} className="animate-scale-in" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-xl animate-slideDown">
          <div className="flex flex-col space-y-2 px-4 py-4">
            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-semibold group"
                >
                  <User size={20} className="group-hover:scale-110 transition-transform duration-200" />
                  <span>{user.username}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 py-3 rounded-xl text-sm font-bold hover:from-red-600 hover:to-red-700 transition-all duration-200 text-white shadow-lg"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 font-semibold group"
                >
                  <LogIn size={20} className="group-hover:scale-110 transition-transform duration-200" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-white shadow-lg"
                >
                  <UserPlus size={20} />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style>{`
        @keyframes slideDown {
          0% { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes rotate-in {
          0% { 
            transform: rotate(-90deg) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: rotate(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          0% { 
            transform: scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        .animate-rotate-in {
          animation: rotate-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;