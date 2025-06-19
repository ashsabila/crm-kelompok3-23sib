import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Box,
  BarChart2,
  Settings,
  LogIn,
  UserPlus,
  MessageSquare,
  NotebookIcon,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Bell } from 'lucide-react';

//menu item, bisa di tambahkan
const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/' },
  { name: 'Produk', icon: <Box />, path: '/produk' },
  { name: 'Pelanggan', icon: <Users />, path: '/pelanggan' },
  { name: 'Penjualan', icon: <ShoppingCart />, path: '/penjualan' },
  { name: 'Notifikasi', icon: <Bell />, path: '/notifikasi' },
  { name: 'Masukan', icon: <MessageSquare />, path: '/feedback' },
  { name: 'Laporan', icon: <BarChart2 />, path: '/laporan' },
  { name: "Layanan Mandiri(FAQ)", icon: <NotebookIcon />, path: "/faq" },
  { name: "FaqAdmin", icon: <NotebookIcon />, path: "/admin/faq" },
];

const accountItems = [
  { name: 'Pengaturan Akun', icon: <Settings />, path: '/akun' },
  { name: 'Sign In', icon: <LogIn />, path: '/signin' },
  { name: 'Sign Up', icon: <UserPlus />, path: '/signup' },
];

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="bg-blue-900 w-64 h-screen shadow-lg px-4 py-6 hidden md:block text-white">
      {/* Logo Hanya Gambar */}
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Logo" className="w-200 h-20 object-contain" />
      </div>

      {/* Menu Utama */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-700 transition ${
              isActive(item.path)
                ? 'bg-white text-blue-900 font-semibold'
                : 'text-white'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Akun */}
      <div className="mt-8 text-xs font-semibold text-gray-300">AKUN</div>
      <nav className="mt-2 space-y-1">
        {accountItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-700 transition ${
              isActive(item.path)
                ? 'bg-white text-blue-900 font-semibold'
                : 'text-white'
            }`}
          >
            <span className="w-5 h-5">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
