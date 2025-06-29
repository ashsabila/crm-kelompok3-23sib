// Laporan.js
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Laporan() {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const storedSales = localStorage.getItem("gymSales");
    const storedCustomers = localStorage.getItem("customerData");
    if (storedSales) setSales(JSON.parse(storedSales));
    if (storedCustomers) setCustomers(JSON.parse(storedCustomers));
  }, []);

  const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  const totalLunas = sales
    .filter((s) => s.status === "Lunas")
    .reduce((sum, s) => sum + s.total, 0);

  const totalTransaksi = sales.length;
  const totalStatus = {
    lunas: sales.filter((s) => s.status === "Lunas").length,
    belum: sales.filter((s) => s.status === "Belum Lunas").length,
    batal: sales.filter((s) => s.status === "Batal").length,
  };

  // Hitung penjualan per tanggal untuk grafik
  const salesByDate = sales.reduce((acc, curr) => {
    const existing = acc.find((item) => item.date === curr.date);
    if (existing) {
      existing.total += curr.total;
    } else {
      acc.push({ date: curr.date, total: curr.total });
    }
    return acc;
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">📊 Laporan Penjualan & Pelanggan</h1>

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
      
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">📈 Tren Penjualan per Tanggal</h2>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesByDate}
              margin={{ top: 10, right: 30, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#6366F1" strokeWidth={3} name="Total Penjualan" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
