import React from 'react';
import { Gift, AlertCircle } from 'lucide-react'; // ikon dari lucide-react

const customers = [
  { name: "Budi Santoso", birthday: "1990-05-28", active: true },
  { name: "Siti Aminah", birthday: "1992-11-12", active: false },
  { name: "Andi Wijaya", birthday: "1995-05-28", active: true },
];

function isBirthdayToday(birthday) {
  const today = new Date();
  const bday = new Date(birthday);
  return today.getDate() === bday.getDate() && today.getMonth() === bday.getMonth();
}

export default function Notifikasi() {
  const birthdayToday = customers.filter(c => isBirthdayToday(c.birthday));
  const inactiveCustomers = customers.filter(c => !c.active);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">🔔 Pusat Notifikasi</h1>

      {/* Ulang Tahun */}
      {birthdayToday.length > 0 && (
        <div className="mb-6 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-5 shadow">
          <div className="flex items-center gap-3 mb-3">
            <Gift className="text-yellow-600" />
            <h2 className="text-lg font-semibold text-yellow-800">🎉 Ulang Tahun Hari Ini</h2>
          </div>
          <ul className="list-disc pl-6 text-yellow-800">
            {birthdayToday.map((c, i) => (
              <li key={i} className="py-1">Selamat ulang tahun, <span className="font-semibold">{c.name}</span>! 🎂</li>
            ))}
          </ul>
        </div>
      )}

      {/* Pelanggan Tidak Aktif */}
      {inactiveCustomers.length > 0 && (
        <div className="mb-6 rounded-xl border-l-4 border-red-500 bg-red-50 p-5 shadow">
          <div className="flex items-center gap-3 mb-3">
            <AlertCircle className="text-red-600" />
            <h2 className="text-lg font-semibold text-red-800">📢 Pelanggan Tidak Aktif</h2>
          </div>
          <ul className="list-disc pl-6 text-red-800">
            {inactiveCustomers.map((c, i) => (
              <li key={i} className="py-1"><span className="font-semibold">{c.name}</span> sudah tidak aktif. Perlu ditindaklanjuti.</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tidak ada notifikasi */}
      {birthdayToday.length === 0 && inactiveCustomers.length === 0 && (
        <div className="text-gray-600 text-center mt-10 text-lg">
          Tidak ada notifikasi saat ini. ✅
        </div>
      )}
    </div>
  );
}
