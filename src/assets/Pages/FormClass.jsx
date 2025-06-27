import React, { useState, useEffect } from "react";

export default function FormClass() {
  // Ambil data dari localStorage saat pertama kali dimuat
  const [classList, setClassList] = useState(() => {
    const stored = localStorage.getItem("classList");
    return stored ? JSON.parse(stored) : [];
  });

  // Data inputan class baru
  const [newClass, setNewClass] = useState({
    name_class: "",
    jenis_ruangan: "",
    detail_ruangan: "",
  });

  // Setiap kali classList berubah, simpan ke localStorage
  useEffect(() => {
    localStorage.setItem("classList", JSON.stringify(classList));
  }, [classList]);

  // Tangani input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prev) => ({ ...prev, [name]: value }));
  };

  // Tangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name_class, jenis_ruangan, detail_ruangan } = newClass;
    if (!name_class || !jenis_ruangan || !detail_ruangan) return;

    const classWithId = {
      id: Date.now(),
      ...newClass,
    };

    setClassList([classWithId, ...classList]);
    setNewClass({ name_class: "", jenis_ruangan: "", detail_ruangan: "" });
  };

  // Hapus class berdasarkan ID
  const handleDelete = (id) => {
    setClassList(classList.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 text-black shadow-md">
        <h2 className="text-2xl font-bold text-[#C6A15B] mb-4 text-center">
          Tambah Class Gym
        </h2>

        {/* Form Tambah Class */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block mb-1 font-medium">Nama Class</label>
            <input
              type="text"
              name="name_class"
              value={newClass.name_class}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-[#C6A15B]"
              placeholder="Masukkan nama class"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Jenis Ruangan</label>
            <input
              type="text"
              name="jenis_ruangan"
              value={newClass.jenis_ruangan}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-[#C6A15B]"
              placeholder="Contoh: Cycling Studio"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Detail Ruangan</label>
            <textarea
              name="detail_ruangan"
              value={newClass.detail_ruangan}
              onChange={handleChange}
              rows={3}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-[#C6A15B]"
              placeholder="Masukkan detail ruangan"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-[#C6A15B] text-white px-6 py-2 rounded hover:bg-[#a78345] transition"
          >
            Simpan Class
          </button>
        </form>

        {/* Daftar Class */}
        <h3 className="text-xl font-semibold mb-4">Daftar Class</h3>
        {classList.length === 0 ? (
          <p className="text-gray-500">Belum ada class.</p>
        ) : (
          <ul className="space-y-4">
            {classList.map((c) => (
              <li key={c.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-[#C6A15B]">{c.name_class}</h4>
                    <p className="text-sm text-gray-500">{c.jenis_ruangan}</p>
                    <p className="text-gray-800 mt-1">{c.detail_ruangan}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
