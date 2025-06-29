import React, { useEffect, useState } from "react";
import {
  Gift,
  AlertCircle,
  CalendarClock,
  Clock,
  Megaphone,
  CalendarCheck,
} from "lucide-react";

const customers = [
  { name: "Budi Santoso", birthday: "1990-05-28", active: true, membershipEnd: "2025-07-02" },
  { name: "Siti Aminah", birthday: "1992-11-12", active: false, membershipEnd: "2025-06-10" },
  { name: "Andi Wijaya", birthday: "1995-06-27", active: true, membershipEnd: "2025-06-30" },
];

const todayClass = [
  { title: "Zumba", time: "08:00", trainer: "Dika Surya" },
  { title: "TRX", time: "17:00", trainer: "Sarah Putri" },
];

const adminMessages = [
  "🎉 Akan ada kelas baru HIIT Boxing mulai bulan depan!",
  "🧘‍♂️ Promo Yoga Bulan Juli – gratis 2 sesi untuk member aktif.",
  "💡 Tips hari ini: Jangan lupa minum air putih sebelum dan sesudah latihan.",
];

function isBirthdayToday(birthday) {
  const today = new Date();
  const bday = new Date(birthday);
  return today.getDate() === bday.getDate() && today.getMonth() === bday.getMonth();
}

function daysLeft(date) {
  const today = new Date();
  const end = new Date(date);
  const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function Notifikasi() {
  const birthdayToday = customers.filter((c) => isBirthdayToday(c.birthday));
  const inactiveCustomers = customers.filter((c) => !c.active);
  const expiringSoon = customers.filter(
    (c) => daysLeft(c.membershipEnd) <= 5 && daysLeft(c.membershipEnd) >= 0
  );

  const [rescheduleNotifications, setRescheduleNotifications] = useState([]);

  // Fungsi ambil data dari localStorage
  const fetchNotifications = () => {
    const stored = localStorage.getItem("rescheduleNotifications");
    if (stored) {
      try {
        setRescheduleNotifications(JSON.parse(stored));
      } catch (err) {
        console.error("Gagal parsing notifikasi:", err);
      }
    } else {
      setRescheduleNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Event listener: jika ada perubahan di localStorage dari komponen lain (misal admin)
    const handleStorageChange = (event) => {
      if (event.key === "rescheduleNotifications") {
        fetchNotifications();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">🔔 Pusat Notifikasi</h1>

      {/* Ulang Tahun Hari Ini */}
      {birthdayToday.length > 0 && (
        <div className="mb-6 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 shadow">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="text-yellow-600" />
            <h2 className="text-lg font-semibold text-yellow-800">🎉 Ulang Tahun Hari Ini</h2>
          </div>
          <ul className="list-disc pl-6 text-yellow-800">
            {birthdayToday.map((c, i) => (
              <li key={i} className="py-1">
                Selamat ulang tahun, <span className="font-semibold">{c.name}</span>! 🎂
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* Jadwal Kelas Hari Ini */}
      {todayClass.length > 0 && (
        <div className="mb-6 rounded-xl border-l-4 border-blue-500 bg-blue-50 p-5 shadow">
          <div className="flex items-center gap-3 mb-3">
            <CalendarClock className="text-blue-600" />
            <h2 className="text-lg font-semibold text-blue-800">📅 Kelas Hari Ini</h2>
          </div>
          <ul className="list-disc pl-6 text-blue-800">
            {todayClass.map((cls, i) => (
              <li key={i} className="py-1">
                <span className="font-semibold">{cls.title}</span> - {cls.time} bersama {cls.trainer}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Info & Promo dari Admin */}
      {adminMessages.length > 0 && (
        <div className="mb-6 rounded-xl border-l-4 border-green-500 bg-green-50 p-5 shadow">
          <div className="flex items-center gap-3 mb-3">
            <Megaphone className="text-green-600" />
            <h2 className="text-lg font-semibold text-green-800">📣 Info & Promo dari Admin</h2>
          </div>
          <ul className="list-disc pl-6 text-green-800">
            {adminMessages.map((msg, i) => (
              <li key={i} className="py-1">{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Status Reschedule */}
      {rescheduleNotifications.length > 0 && (
        <div className="mb-6 rounded-xl border-l-4 border-indigo-500 bg-indigo-50 p-5 shadow">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="text-indigo-600" />
            <h2 className="text-lg font-semibold text-indigo-800">📆 Status Permintaan Reschedule</h2>
          </div>
          <ul className="list-disc pl-6 text-indigo-800">
            {rescheduleNotifications.map((notif) => (
              <li key={notif.id} className="py-1">{notif.message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tidak ada notifikasi */}
      {birthdayToday.length === 0 &&
        inactiveCustomers.length === 0 &&
        todayClass.length === 0 &&
        expiringSoon.length === 0 &&
        adminMessages.length === 0 &&
        rescheduleNotifications.length === 0 && (
          <div className="text-gray-600 text-center mt-10 text-lg">
            Tidak ada notifikasi saat ini. ✅
          </div>
      )}
    </div>
  );
}
