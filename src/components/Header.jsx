import { Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-blue-900 shadow-sm border-b border-blue-800 sticky top-0 z-10 text-white">
      {/* Breadcrumb */}
      <div className="text-sm">
        Pages / <span className="font-semibold text-white">Dashboard</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Type here..."
            className="px-4 py-2 pl-10 text-sm border-none rounded-full bg-white text-gray-800 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Button Daftar */}
        <button
          onClick={() => navigate('/pendaftaran')}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold py-2 px-4 rounded-full transition"
        >
          Daftar Sekarang
        </button>

        {/* Sign In */}
        <div
          className="flex items-center gap-2 text-sm cursor-pointer hover:text-yellow-400"
          onClick={() => navigate('/signin')}
        >
          <User className="w-4 h-4" />
          Sign In
        </div>
      </div>
    </header>
  );
};

export default Header;
