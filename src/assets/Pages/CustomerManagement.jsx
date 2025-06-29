import React, { useEffect, useState } from "react";

const CUSTOMER_STORAGE_KEY = "customerData";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    active: true,
    birthday: "",
    status: "Silver",
  });

  useEffect(() => {
    const storedCustomers = localStorage.getItem(CUSTOMER_STORAGE_KEY);
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(data));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.birthday) {
      alert("Semua field wajib diisi!");
      return;
    }
    const newCustomer = {
      id: Date.now(),
      ...formData,
    };
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    saveToLocalStorage(updatedCustomers);
    setFormData({
      name: "",
      email: "",
      phone: "",
      active: true,
      birthday: "",
      status: "Silver",
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus pelanggan ini?")) {
      const updated = customers.filter((c) => c.id !== id);
      setCustomers(updated);
      saveToLocalStorage(updated);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manajemen Pelanggan</h1>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Batal Tambah Pelanggan" : "Tambah Pelanggan"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded shadow-sm bg-white">
          <div className="mb-2">
            <label className="block font-medium mb-1">Nama</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nama pelanggan"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email pelanggan"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Telepon</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nomor telepon"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Tanggal Lahir</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-2">
            <label className="block font-medium mb-1">Status Membership</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
              id="activeCheckbox"
              className="mr-2"
            />
            <label htmlFor="activeCheckbox" className="font-medium">Aktif</label>
          </div>
          <button
            onClick={handleAddCustomer}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Simpan
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telepon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aktif</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((cust) => (
              <tr key={cust.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{cust.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cust.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cust.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cust.birthday}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cust.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {cust.active ? (
                    <span className="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex px-2 text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Tidak Aktif
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-900 font-semibold"
                    onClick={() => alert("Fitur Edit belum tersedia")}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:text-red-900 font-semibold"
                    onClick={() => handleDelete(cust.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Tidak ada data pelanggan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
