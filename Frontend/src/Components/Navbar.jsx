import { useState } from "react";
import { Menu, X, Sun, Moon, Home, Info, ShoppingCart, Phone, User } from "lucide-react";
import Logo from "../assets/Logo.png"
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../slices/themeSlice';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useSelector(state => state.cart.totalItems);
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900/95 backdrop-blur-lg text-white border-b border-gray-800' 
        : 'bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">        
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center space-x-2 group"
            >
              <span className={`text-xl font-bold ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600'
              } text-transparent bg-clip-text`}>
                ShopCart
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-1">
            {[
              { to: "/", icon: Home, text: "Home" },
              { to: "#", icon: Info, text: "About" },
              { to: "/cart", icon: ShoppingCart, text: "Cart", badge: cartCount },
              { to: "#", icon: Phone, text: "Contact" },
              { to: "/profile", icon: User, text: "Profile" }
            ].map((item) => (
              <Link
                key={item.text}
                to={item.to}
                className={`group flex items-center px-4 py-2 mx-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.to
                    ? theme === 'dark'
                      ? 'bg-gray-800 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                    : theme === 'dark'
                    ? 'text-gray-200 hover:bg-gray-800 hover:text-blue-400'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <item.icon 
                  size={18} 
                  className={`mr-2 transition-transform duration-300 group-hover:scale-110 ${
                    location.pathname === item.to
                      ? 'text-blue-500'
                      : ''
                  }`}
                />
                {item.text}
                {item.badge > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            
            <button
              onClick={handleThemeToggle}
              className={`ml-4 p-2 rounded-lg transition-all duration-200 ${
                theme === 'dark' 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700 hover:text-yellow-300' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/cart"
              className={`p-2 rounded-lg relative ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={handleThemeToggle} 
              className={`p-2 rounded-lg ${
                theme === 'dark' 
                  ? 'text-yellow-400 hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button 
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${
                theme === 'dark' 
                  ? 'text-white hover:bg-gray-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div 
            className={`px-4 pt-2 pb-3 space-y-1 border-t ${
              theme === 'dark' 
                ? 'bg-gray-900/95 backdrop-blur-lg text-white border-gray-800' 
                : 'bg-white/95 backdrop-blur-lg border-gray-100'
            }`}
          >
            {[
              { to: "/", icon: Home, text: "Home" },
              { to: "#", icon: Info, text: "About" },
              { to: "/cart", icon: ShoppingCart, text: "Cart", badge: cartCount },
              { to: "#", icon: Phone, text: "Contact" },
              { to: "/profile", icon: User, text: "Profile" }
            ].map((item) => (
              <Link
                key={item.text}
                to={item.to}
                className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  location.pathname === item.to
                    ? theme === 'dark'
                      ? 'bg-gray-800 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                    : theme === 'dark'
                    ? 'text-gray-200 hover:bg-gray-800 hover:text-blue-400'
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon 
                  size={20} 
                  className={`mr-3 ${
                    location.pathname === item.to
                      ? 'text-blue-500'
                      : ''
                  }`}
                />
                {item.text}
                {item.badge > 0 && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

    </nav>
  );
}
