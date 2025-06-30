import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { supabase } from "../../supabase"; // sesuaikan path

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [layanan, setLayanan] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: pelangganData } = await supabase.from("pelanggan").select("*");
    const { data: penjualanData } = await supabase.from("penjualan").select("*");
    const { data: layananData } = await supabase.from("layanan").select("*");
    setCustomers(pelangganData || []);
    setSales(penjualanData || []);
    setLayanan(layananData || []);
  };

  const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  const totalRevenue = sales
    .filter((s) => s.status === "Lunas")
    .reduce((sum, s) => {
      const found = layanan.find((l) => l.id === s.layanan_id);
      return sum + (found ? found.harga * s.jumlah : 0);
    }, 0);

  const monthlySales = Array(12).fill(0);
  const monthlyCustomers = Array(12).fill(0);
  const currentMonth = new Date().getMonth();

  sales.forEach((s) => {
    if (s.status === "Lunas") {
      const month = new Date(s.tanggal).getMonth();
      const found = layanan.find((l) => l.id === s.layanan_id);
      monthlySales[month] += found ? (found.harga * s.jumlah) / 1000 : 0;
    }
  });

  customers.forEach((c) => {
    const month = new Date(c.tanggal_bergabung).getMonth();
    monthlyCustomers[month]++;
  });

  const salesThisMonth = sales.filter(
    (s) => new Date(s.tanggal).getMonth() === currentMonth && s.status === "Lunas"
  );

  const serviceTotals = {};
  salesThisMonth.forEach((s) => {
    const found = layanan.find((l) => l.id === s.layanan_id);
    if (found) {
      if (!serviceTotals[found.nama]) serviceTotals[found.nama] = 0;
      serviceTotals[found.nama] += found.harga * s.jumlah;
    }
  });

  const pieData = {
    labels: Object.keys(serviceTotals),
    datasets: [
      {
        data: Object.values(serviceTotals),
        backgroundColor: ["#60A5FA", "#34D399", "#FBBF24"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Penjualan (Ribuan Rupiah)",
        data: monthlySales,
        backgroundColor: "rgba(99, 102, 241, 0.7)",
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    datasets: [
      {
        label: "Jumlah Pelanggan Baru",
        data: monthlyCustomers,
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
        tension: 0.3,
        pointRadius: 4,
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Total Pelanggan</p>
          <h2 className="text-2xl font-bold text-blue-600">{customers.length}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Total Penjualan</p>
          <h2 className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Penjualan Bulanan" },
              },
            }}
            data={barData}
          />
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <Pie
            data={pieData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "bottom" },
                title: { display: true, text: "Komposisi Penjualan Bulan Ini" },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Pertumbuhan Pelanggan" },
            },
          }}
          data={lineData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
