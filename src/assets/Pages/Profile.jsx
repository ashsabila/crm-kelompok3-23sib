import React, { useEffect, useState } from "react";
import { UserCircle, Star } from "lucide-react";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Nama Anda",
    email: "email@example.com",
  });

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        setUserData(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse user profile:", err);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Profil */}
        <div className="md:w-1/3 bg-blue-900 text-white p-8 flex flex-col items-center justify-center">
          <UserCircle className="w-28 h-28 mb-4 text-white" />
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-sm text-blue-200">{userData.email}</p>

          {/* Membership Badge */}
          <div className="mt-4 px-3 py-1 bg-yellow-300 text-gray-900 text-xs font-semibold rounded-full flex items-center gap-1">
            <Star className="w-4 h-4" />
            Silver Member
          </div>
        </div>

        {/* Detail Info */}
        <div className="md:w-2/3 p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Informasi Akun</h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-500">Nama Lengkap</label>
              <div className="mt-1 text-lg font-semibold text-gray-800">
                {userData.name}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Email</label>
              <div className="mt-1 text-lg font-semibold text-gray-800">
                {userData.email}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500">Membership</label>
              <div className="mt-1 text-lg font-semibold text-gray-800">
                Silver
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-8">
              Untuk mengubah informasi akun, silakan kunjungi halaman <b>Pengaturan Akun</b>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
