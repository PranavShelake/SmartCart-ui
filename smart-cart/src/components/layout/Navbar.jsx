// C:\Users\PranavShelake\Desktop\project\frontend\smart-cart\src\components\layout\Navbar.jsx
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = ({ onAuthClick }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg shadow-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold tracking-wide bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SmartCart
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {["Home", "Features", "Products", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.full_name?.charAt(0) || "U"}
                  </div>
                  <span className="text-gray-700">{user?.full_name || "User"}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-600 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
