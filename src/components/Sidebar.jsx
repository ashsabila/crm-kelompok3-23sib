import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart2,
  Settings,
  LogIn,
  UserPlus,
  MessageSquare,
  NotebookIcon,
  Disc,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import logoFocusFit from '../assets/gambar/logoFocusFit.png';
import { GiClassicalKnowledge } from 'react-icons/gi';
import { MdSchedule } from 'react-icons/md';

const menuItems = [
  { name: 'Dashboard', icon: <LayoutDashboard />, path: '/dashboard' },
  { name: 'Pelanggan', icon: <Users />, path: '/pelanggan' },
  { name: 'Penjualan', icon: <ShoppingCart />, path: '/penjualan' },
  { name: 'Class', icon: <GiClassicalKnowledge className="text-[20px]" />, path: '/class' },
  { name: 'Notifikasi', icon: <Bell />, path: '/notifikasi' },
  { name: 'Masukan', icon: <MessageSquare />, path: '/feedback' },
  { name: 'Laporan', icon: <BarChart2 />, path: '/laporan' },
  { name: 'Layanan Mandiri(FAQ)', icon: <NotebookIcon />, path: '/faq' },
  { name: 'FaqAdmin', icon: <NotebookIcon />, path: '/admin/faq' },
  { name: 'Booking and Schedule', icon: <MdSchedule className="text-[20px]" />, path: '/BookingSchedule' },
  { name: 'Promo and Royalty', icon: <Disc />, path: '/PromoRoyalty' },
  { name: 'Help Center', icon: <Disc />, path: '/help' },
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
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#102B56] text-white shadow-lg px-4 py-6 overflow-y-auto z-40 hidden md:block">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src={logoFocusFit} alt="Logo" className="w-200 h-20 object-contain" />
      </div>

      {/* Menu Utama */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#EEF0F3] transition ${
              isActive(item.path)
                ? 'bg-[#EEF0F3] text-blue-900 font-semibold'
                : 'text-white'
            }`}
          >
            <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
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
            <span className="w-5 h-5 flex items-center justify-center">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
