import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // sesuaikan path

export default function SalesManagement() {
  const [sales, setSales] = useState([]);
  const [layananList, setLayananList] = useState([]);
  const [pelangganList, setPelangganList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    layanan_id: "",
    pelanggan: "",
    tanggal: "",
    jumlah: 1,
    status: "Belum Lunas",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const formatCurrency = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: layanan } = await supabase.from("layanan").select("*");
    const { data: pelanggan } = await supabase.from("pelanggan").select("*");
    const { data: penjualan } = await supabase.from("penjualan").select("*");

    setLayananList(layanan || []);
    setPelangganList(pelanggan || []);
    setSales(penjualan || []);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateSale = async () => {
    const layanan = layananList.find((l) => l.id === formData.layanan_id);
    if (!layanan || !formData.pelanggan || !formData.tanggal) {
      alert("Semua field wajib diisi");
      return;
    }

    if (isEditing && editId) {
      const { error } = await supabase
        .from("penjualan")
        .update({
          layanan_id: formData.layanan_id,
          pelanggan: formData.pelanggan,
          tanggal: formData.tanggal,
          jumlah: Number(formData.jumlah),
          status: formData.status,
        })
        .eq("id", editId);

      if (error) {
        alert("Gagal mengupdate penjualan: " + error.message);
        return;
      }
    } else {
      const { error } = await supabase.from("penjualan").insert({
        layanan_id: formData.layanan_id,
        pelanggan: formData.pelanggan,
        tanggal: formData.tanggal,
        jumlah: Number(formData.jumlah),
        status: formData.status,
      });

      if (error) {
        alert("Gagal menambah penjualan: " + error.message);
        return;
      }
    }

    setFormData({ layanan_id: "", pelanggan: "", tanggal: "", jumlah: 1, status: "Belum Lunas" });
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
    fetchData();
  };

  const handleEdit = (sale) => {
    setFormData({
      layanan_id: sale.layanan_id,
      pelanggan: sale.pelanggan,
      tanggal: sale.tanggal,
      jumlah: sale.jumlah,
      status: sale.status,
    });
    setIsEditing(true);
    setEditId(sale.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      await supabase.from("penjualan").delete().eq("id", id);
      fetchData();
    }
  };

  const getNamaLayanan = (id) => layananList.find((l) => l.id === id)?.nama || "-";
  const getHargaLayanan = (id) => layananList.find((l) => l.id === id)?.harga || 0;
  const getNamaPelanggan = (id) => pelangganList.find((p) => p.id === id)?.name || "-";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">📊 Admin - Manajemen Penjualan</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setFormData({ layanan_id: "", pelanggan: "", tanggal: "", jumlah: 1, status: "Belum Lunas" });
          setIsEditing(false);
          setEditId(null);
        }}
        className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {showForm ? "Batal" : isEditing ? "Edit Penjualan" : "Tambah Penjualan"}
      </button>

      {showForm && (
        <div className="bg-white p-4 rounded shadow border mb-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block font-medium">Layanan</label>
              <select name="layanan_id" value={formData.layanan_id} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                <option value="">-- Pilih Layanan --</option>
                {layananList.map((l) => (
                  <option key={l.id} value={l.id}>{l.nama} - {formatCurrency(l.harga)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Pelanggan</label>
              <select name="pelanggan" value={formData.pelanggan} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                <option value="">-- Pilih Pelanggan --</option>
                {pelangganList.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium">Tanggal</label>
              <input type="date" name="tanggal" value={formData.tanggal} onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block font-medium">Jumlah</label>
              <input type="number" name="jumlah" value={formData.jumlah} min="1" onChange={handleInputChange} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block font-medium">Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="w-full border px-3 py-2 rounded">
                <option value="Lunas">Lunas</option>
                <option value="Belum Lunas">Belum Lunas</option>
                <option value="Batal">Batal</option>
              </select>
            </div>
          </div>
          <button onClick={handleAddOrUpdateSale} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            {isEditing ? "Simpan Perubahan" : "Simpan"}
          </button>
        </div>
      )}

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3">Layanan</th>
              <th className="px-6 py-3">Pelanggan</th>
              <th className="px-6 py-3">Tanggal</th>
              <th className="px-6 py-3 text-center">Jumlah</th>
              <th className="px-6 py-3 text-right">Total</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sales.map((s) => {
              const harga = getHargaLayanan(s.layanan_id);
              return (
                <tr key={s.id}>
                  <td className="px-6 py-4">{getNamaLayanan(s.layanan_id)}</td>
                  <td className="px-6 py-4">{getNamaPelanggan(s.pelanggan)}</td>
                  <td className="px-6 py-4">{s.tanggal}</td>
                  <td className="px-6 py-4 text-center">{s.jumlah}</td>
                  <td className="px-6 py-4 text-right">{formatCurrency(harga * s.jumlah)}</td>
                  <td className="px-6 py-4 text-center">
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
                  <td className="px-6 py-4 text-center space-x-2">
                    <button onClick={() => handleEdit(s)} className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-800 text-sm">Hapus</button>
                  </td>
                </tr>
              );
            })}
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
