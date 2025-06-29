import React, { useEffect, useState } from "react";

const CUSTOMER_STORAGE_KEY = "customerData";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    active: true,
    birthday: "",
    status: "Silver",
  });
  const [isEditing, setIsEditing] = useState(false);

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

  const handleAddOrEditCustomer = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.birthday) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (isEditing) {
      const updatedCustomers = customers.map((c) =>
        c.id === formData.id ? formData : c
      );
      setCustomers(updatedCustomers);
      saveToLocalStorage(updatedCustomers);
    } else {
      const newCustomer = {
        id: Date.now(),
        ...formData,
      };
      const updatedCustomers = [...customers, newCustomer];
      setCustomers(updatedCustomers);
      saveToLocalStorage(updatedCustomers);
    }

    setFormData({
      id: null,
      name: "",
      email: "",
      phone: "",
      active: true,
      birthday: "",
      status: "Silver",
    });
    setShowForm(false);
    setIsEditing(false);
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setShowForm(true);
    setIsEditing(true);
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
        onClick={() => {
          setShowForm(!showForm);
          setFormData({
            id: null,
            name: "",
            email: "",
            phone: "",
            active: true,
            birthday: "",
            status: "Silver",
          });
          setIsEditing(false);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Batal" : "Tambah Pelanggan"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded shadow-sm bg-white">
          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nama"
              className="border px-3 py-2 rounded"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Nomor Telepon"
              className="border px-3 py-2 rounded"
            />
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded"
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded"
            >
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="mr-2"
              />
              Aktif
            </label>
            <button
              onClick={handleAddOrEditCustomer}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {isEditing ? "Update Pelanggan" : "Simpan Pelanggan"}
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telepon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Lahir</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aktif</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((cust) => (
              <tr key={cust.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{cust.name}</td>
                <td className="px-6 py-4">{cust.email}</td>
                <td className="px-6 py-4">{cust.phone}</td>
                <td className="px-6 py-4">{cust.birthday}</td>
                <td className="px-6 py-4">{cust.status}</td>
                <td className="px-6 py-4 text-center">
                  {cust.active ? (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Aktif</span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Tidak Aktif</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center space-x-2 flex justify-center items-center">
                  <button
                    onClick={() => handleEdit(cust)}
                    className="text-blue-600 hover:text-blue-900 font-semibold"
                  >
                    Edit
                  </button>
                  <span>|</span>
                  <button
                    onClick={() => handleDelete(cust.id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">Tidak ada data pelanggan</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
