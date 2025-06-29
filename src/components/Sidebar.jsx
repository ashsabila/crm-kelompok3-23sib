import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart2,
  MessageSquare,
  NotebookIcon,
  Bell,
  Disc,
} from "lucide-react";
import { GiClassicalKnowledge } from "react-icons/gi";
import { MdDashboard, MdSchedule } from "react-icons/md";
import { CgAddR } from "react-icons/cg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logoFocusFit from "../assets/gambar/logoFocusFit.png";

const Sidebar = () => {
  const location = useLocation();
  const [role, setRole] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRole(parsed.role || "member"); // default ke member
      } catch (err) {
        console.error("Failed to parse user profile", err);
      }
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const adminMenu = [
    { name: "Dashboard Admin", icon: <LayoutDashboard />, path: "/dashboard" },
    { name: "Pelanggan", icon: <Users />, path: "/pelanggan" },
    { name: "Penjualan", icon: <ShoppingCart />, path: "/penjualan" },
    { name: "Tambah Class & Trainer", icon: <CgAddR />, path: "/FormClass" },
    { name: "Laporan", icon: <BarChart2 />, path: "/laporan" },
    { name: "FAQ Admin", icon: <NotebookIcon />, path: "/admin/faq" },
    { name: "Feedback Member", icon: <MessageSquare />, path: "/admin/fb" },
    { name: "Request Reschedule", icon: <MessageSquare />, path: "/req/res" },
  ];

  const memberMenu = [
    { name: "Dashboard", icon: <MdDashboard />, path: "/dashboard/mem" },
    { name: "Class & Trainer", icon: <GiClassicalKnowledge className="text-[20px]" />, path: "/class" },
    { name: "Booking Schedule", icon: <MdSchedule className="text-[20px]" />, path: "/BookingSchedule" },
    { name: "Promo & Royalty", icon: <Disc />, path: "/PromoRoyalty" },
    { name: "Notifikasi", icon: <Bell />, path: "/notifikasi" },
    { name: "Feedback", icon: <MessageSquare />, path: "/feedback" },
    { name: "FAQ", icon: <NotebookIcon />, path: "/faq" },
  ];

  const menuItems = role === "admin" ? adminMenu : memberMenu;

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-[#102B56] text-white shadow-lg px-4 py-6 overflow-y-auto z-40 hidden md:block">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src={logoFocusFit} alt="Logo" className="w-40 h-auto object-contain" />
      </div>

      {/* Menu Dinamis */}
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#EEF0F3] transition ${
              isActive(item.path)
                ? "bg-[#EEF0F3] text-blue-900 font-semibold"
                : "text-white"
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
