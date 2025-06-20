import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const dummySales = [
  { id: 1, invoice: "INV-001", customerId: 1, date: "2025-05-10", total: 1500000, status: "Lunas" },
  { id: 2, invoice: "INV-002", customerId: 2, date: "2025-05-11", total: 250000, status: "Belum Lunas" },
  { id: 3, invoice: "INV-003", customerId: 3, date: "2025-05-12", total: 900000, status: "Lunas" },
  { id: 4, invoice: "INV-004", customerId: 1, date: "2025-05-13", total: 500000, status: "Batal" },
  { id: 5, invoice: "INV-005", customerId: 2, date: "2025-05-12", total: 750000, status: "Lunas" },
];

function formatCurrency(num) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(num);
}

// Hitung total penjualan per tanggal
const salesByDate = dummySales.reduce((acc, curr) => {
  const existing = acc.find((item) => item.date === curr.date);
  if (existing) {
    existing.total += curr.total;
  } else {
    acc.push({ date: curr.date, total: curr.total });
  }
  return acc;
}, []);

export default function Laporan() {
  const totalLunas = dummySales
    .filter((sale) => sale.status === "Lunas")
    .reduce((sum, sale) => sum + sale.total, 0);

  const totalTransaksi = dummySales.length;

  const totalStatus = {
    lunas: dummySales.filter((s) => s.status === "Lunas").length,
    belum: dummySales.filter((s) => s.status === "Belum Lunas").length,
    batal: dummySales.filter((s) => s.status === "Batal").length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">📊 Pelaporan & Analisis Penjualan</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-500 mb-1">Total Penjualan (Lunas)</h2>
          <p className="text-xl font-semibold text-green-600">{formatCurrency(totalLunas)}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-500 mb-1">Jumlah Transaksi</h2>
          <p className="text-xl font-semibold text-indigo-600">{totalTransaksi} transaksi</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-sm text-gray-500 mb-1">Status Transaksi</h2>
          <ul className="text-sm mt-1 text-gray-700 space-y-1">
            <li>✅ Lunas: {totalStatus.lunas}</li>
            <li>🕐 Belum Lunas: {totalStatus.belum}</li>
            <li>❌ Batal: {totalStatus.batal}</li>
          </ul>
        </div>
      </div>

      {/* Grafik Tren */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">📈 Tren Penjualan per Tanggal</h2>
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesByDate} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
