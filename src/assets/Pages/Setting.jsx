import { useEffect, useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFormData({
          name: parsed.name || "",
          email: parsed.email || "",
          password: parsed.password || "",
        });
      } catch (err) {
        console.error("Gagal mengambil data profile dari localStorage:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simpan kembali semua data yang diubah
    const updatedProfile = {
      name: formData.name,
      email: formData.email,
      password: formData.password, // meskipun opsional, tetap disimpan jika diisi
    };

    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    alert("✅ Perubahan profil berhasil disimpan!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Pengaturan Akun</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password Baru</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Opsional"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
