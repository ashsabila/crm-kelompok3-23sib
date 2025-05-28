import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    package: "",
    note: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Data disimpan ke /pelanggan:");
    console.table(formData);

    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#181B23] px-4">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-[#C6A15B] mb-6 text-center">Pendaftaran Member</h2>

        <div className="mb-4">
          <label className="block text-[#181B23] font-medium mb-1">Nama Lengkap</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-[#C6A15B]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#181B23] font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-[#C6A15B]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#181B23] font-medium mb-1">Nomor Telepon</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-[#C6A15B]"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-[#181B23] font-medium mb-1">Paket</label>
          <select
            name="package"
            value={formData.package}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-[#C6A15B]"
            required
          >
            <option value="">-- Pilih Paket --</option>
            <option value="Bulanan">Bulanan</option>
            <option value="3 Bulan">3 Bulan</option>
            <option value="Tahunan">Tahunan</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-[#181B23] font-medium mb-1">Catatan Tambahan</label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-[#C6A15B]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#C6A15B] text-white font-semibold py-2 px-4 rounded hover:bg-[#a78345] transition"
        >
          Daftar Sekarang
        </button>
      </form>
    </div>
  );
}
