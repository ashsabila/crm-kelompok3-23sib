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

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customerData");
    const storedSales = localStorage.getItem("gymSales");
    if (storedCustomers) setCustomers(JSON.parse(storedCustomers));
    if (storedSales) setSales(JSON.parse(storedSales));
  }, []);

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const monthlySales = Array(12).fill(0);
  const monthlyCustomers = Array(12).fill(0);
  const currentMonth = new Date().getMonth();

  sales.forEach((s) => {
    const month = new Date(s.date).getMonth();
    monthlySales[month] += s.total / 1000;
  });

  customers.forEach((c) => {
    const month = new Date(c.birthday).getMonth();
    monthlyCustomers[month]++;
  });

  // Format rupiah
  const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  // Pie Chart Data: Penjualan per layanan bulan ini
  const salesThisMonth = sales.filter(
    (s) => new Date(s.date).getMonth() === currentMonth
  );

  const serviceTotals = {};
  salesThisMonth.forEach((s) => {
    const service = s.serviceId;
    if (!serviceTotals[service]) serviceTotals[service] = 0;
    serviceTotals[service] += s.total;
  });

  const serviceNames = {
    1: "Membership Bulanan",
    2: "Personal Trainer",
    3: "Produk Suplemen",
  };

  const pieData = {
    labels: Object.keys(serviceTotals).map((id) => serviceNames[id] || "Layanan Lain"),
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
