import React, { useEffect, useState } from "react";

const serviceOptions = [
  { id: 1, name: "Membership Bulanan", price: 250000 },
  { id: 2, name: "Personal Trainer (4 sesi)", price: 500000 },
  { id: 3, name: "Produk Suplemen", price: 150000 },
];

const CUSTOMER_STORAGE_KEY = "customerData";

export default function SalesManagement() {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    serviceId: "",
    customerId: "",
    date: "",
    quantity: 1,
    status: "Belum Lunas",
  });

  useEffect(() => {
    const storedSales = localStorage.getItem("gymSales");
    if (storedSales) setSales(JSON.parse(storedSales));

    const storedCustomers = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    if (storedCustomers) setCustomers(JSON.parse(storedCustomers));
  }, []);

  const saveToStorage = (data) => {
    setSales(data);
    localStorage.setItem("gymSales", JSON.stringify(data));
  };

  const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSale = () => {
    const service = serviceOptions.find((s) => s.id === Number(formData.serviceId));
    if (!service || !formData.customerId || !formData.date) return alert("Lengkapi semua field!");

    const newSale = {
      id: Date.now(),
      serviceId: Number(formData.serviceId),
      customerId: Number(formData.customerId),
      date: formData.date,
      quantity: Number(formData.quantity),
      status: formData.status,
      total: service.price * Number(formData.quantity),
    };

    const updated = [...sales, newSale];
    saveToStorage(updated);

    setFormData({ serviceId: "", customerId: "", date: "", quantity: 1, status: "Belum Lunas" });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin hapus penjualan ini?")) {
      const updated = sales.filter((s) => s.id !== id);
      saveToStorage(updated);
    }
  };

  const getServiceName = (id) => serviceOptions.find((s) => s.id === id)?.name || "-";
  const getCustomerName = (id) => customers.find((c) => c.id === id)?.name || "-";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">📊 Admin - Manajemen Penjualan</h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {showForm ? "Batal" : "Tambah Penjualan"}
      </button>

      {showForm && (
        <div className="bg-white p-4 rounded shadow border mb-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block font-medium">Layanan</label>
              <select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Pilih Layanan --</option>
                {serviceOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} - {formatCurrency(s.price)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Pelanggan</label>
              <select
                name="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">-- Pilih Pelanggan --</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Tanggal</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Jumlah</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                min="1"
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Lunas">Lunas</option>
                <option value="Belum Lunas">Belum Lunas</option>
                <option value="Batal">Batal</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleAddSale}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Simpan
          </button>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layanan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Jumlah</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{getServiceName(s.serviceId)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getCustomerName(s.customerId)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{s.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">{s.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">{formatCurrency(s.total)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    s.status === "Lunas"
                      ? "bg-green-100 text-green-700"
                      : s.status === "Belum Lunas"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {s.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Tidak ada data penjualan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
