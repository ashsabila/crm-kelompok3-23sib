import { Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Fungsi logout dengan konfirmasi
  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      navigate('/'); // Atau arahkan ke halaman login jika berbeda
    }
  };

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center px-6 py-4 bg-[#102B56] shadow-sm border-b border-blue-800 text-white">
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

        {/* Logout */}
        <div
          className="flex items-center gap-2 text-sm cursor-pointer hover:text-yellow-400"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </div>
      </div>
    </header>
  );
};

export default Header;
