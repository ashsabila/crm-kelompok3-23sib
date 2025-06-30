import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    joinDate: "",
    status: "Silver",
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data, error } = await supabase.from("pelanggan").select("*").order("created_at", { ascending: false });
    if (error) console.error("Fetch error:", error.message);
    else setCustomers(data);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddOrEditCustomer = async () => {
    const { name, email, phone, birthday, joinDate, status, active } = formData;
    if (!name || !email || !phone || !birthday || !joinDate) {
      alert("Semua field wajib diisi!");
      return;
    }

    if (isEditing && editId) {
      const { error } = await supabase
        .from("pelanggan")
        .update({
          name,
          email,
          telepon: phone,
          tanggal_lahir: birthday,
          tanggal_bergabung: joinDate,
          status,
          aktif: active,
        })
        .eq("id", editId);

      if (error) {
        alert("Update gagal: " + error.message);
      }
    } else {
      const { error } = await supabase.from("pelanggan").insert([
        {
          name,
          email,
          telepon: phone,
          tanggal_lahir: birthday,
          tanggal_bergabung: joinDate,
          status,
          aktif: active,
        },
      ]);

      if (error) {
        alert("Tambah gagal: " + error.message);
        return;
      }
    }

    await fetchCustomers();
    setFormData({
      name: "",
      email: "",
      phone: "",
      birthday: "",
      joinDate: "",
      status: "Silver",
      active: true,
    });
    setIsEditing(false);
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (cust) => {
    setFormData({
      name: cust.name,
      email: cust.email,
      phone: cust.telepon,
      birthday: cust.tanggal_lahir,
      joinDate: cust.tanggal_bergabung,
      status: cust.status,
      active: cust.aktif,
    });
    setEditId(cust.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pelanggan ini?")) {
      const { error } = await supabase.from("pelanggan").delete().eq("id", id);
      if (error) {
        alert("Gagal menghapus: " + error.message);
        return;
      }
      await fetchCustomers();
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">📊 Manajement Pelanggan</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setFormData({
            name: "",
            email: "",
            phone: "",
            birthday: "",
            joinDate: "",
            status: "Silver",
            active: true,
          });
          setIsEditing(false);
          setEditId(null);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {showForm ? "Batal" : "Tambah Pelanggan"}
      </button>

      {showForm && (
        <div className="mb-6 p-4 border border-gray-300 rounded shadow-sm bg-white">
          <div className="grid grid-cols-1 gap-2">
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama" className="border px-3 py-2 rounded" />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="border px-3 py-2 rounded" />
            <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Nomor Telepon" className="border px-3 py-2 rounded" />
            <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} className="border px-3 py-2 rounded" />
            <input type="date" name="joinDate" value={formData.joinDate} onChange={handleInputChange} className="border px-3 py-2 rounded" />
            <select name="status" value={formData.status} onChange={handleInputChange} className="border px-3 py-2 rounded">
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Platinum">Platinum</option>
            </select>
            <label className="inline-flex items-center">
              <input type="checkbox" name="active" checked={formData.active} onChange={handleInputChange} className="mr-2" />
              Aktif
            </label>
            <button onClick={handleAddOrEditCustomer} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              {isEditing ? "Update Pelanggan" : "Simpan Pelanggan"}
            </button>
          </div>
        </div>
      )}

<div className="px-4 py-6 mx-auto max-w-screen-xl">
  <div className="bg-white rounded-lg shadow-md">
    <table className="w-full table-auto border-collapse">
      <thead className="bg-gray-100 text-gray-600 text-sm font-semibold">
        <tr>
          <th className="px-5 py-3 text-left">Nama</th>
          <th className="px-5 py-3 text-left">Email</th>
          <th className="px-5 py-3 text-left">Telepon</th>
          <th className="px-5 py-3 text-left">Tanggal Lahir</th>
          <th className="px-5 py-3 text-left">Tanggal Bergabung</th>
          <th className="px-5 py-3 text-left">Status</th>
          <th className="px-5 py-3 text-center">Aktif</th>
          <th className="px-5 py-3 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody className="text-sm text-gray-800 divide-y divide-gray-200">
        {customers.map((cust) => (
          <tr key={cust.id} className="hover:bg-gray-50">
            <td className="px-5 py-3">{cust.name}</td>
            <td className="px-5 py-3">{cust.email}</td>
            <td className="px-5 py-3">{cust.telepon}</td>
            <td className="px-5 py-3">{cust.tanggal_lahir}</td>
            <td className="px-5 py-3">{cust.tanggal_bergabung}</td>
            <td className="px-5 py-3">{cust.status}</td>
            <td className="px-5 py-3 text-center">
              {cust.aktif ? (
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">Aktif</span>
              ) : (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">Tidak Aktif</span>
              )}
            </td>
            <td className="px-5 py-3 text-center flex justify-center items-center gap-2">
              <button onClick={() => handleEdit(cust)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
              <span>|</span>
              <button onClick={() => handleDelete(cust.id)} className="text-red-600 hover:text-red-800 font-medium">Hapus</button>
            </td>
          </tr>
        ))}
        {customers.length === 0 && (
          <tr>
            <td colSpan="8" className="text-center py-4 text-gray-500">
              Tidak ada data pelanggan
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}
