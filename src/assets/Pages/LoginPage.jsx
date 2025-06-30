import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoFocusFit from "../gambar/logoFocusFit.png";
import bgGym from "../gambar/bg-login.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const ADMIN_EMAIL = "admin@focusfit.com";
  const ADMIN_PASSWORD = "admin123";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
      alert("Mohon lengkapi semua data!");
      return;
    }

    if (email === ADMIN_EMAIL) {
      if (password === ADMIN_PASSWORD) {
        localStorage.setItem("userProfile", JSON.stringify({ name, email, role: "admin" }));
        alert("Login Admin sukses!");
        navigate("/dashboard");
      } else {
        alert("Password admin salah!");
      }
      return;
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const matchedUser = registeredUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      alert("Email atau password salah atau belum terdaftar!");
      return;
    }

    localStorage.setItem("userProfile", JSON.stringify({ name: matchedUser.name, email, role: "member" }));
    alert("Login sukses!");
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgGym})` }}
    >
      <div className="text-center absolute top-10">
        <img src={logoFocusFit} alt="FocusFit Logo" className="mx-auto w-40" />
      </div>

      <div className="bg-[#D9B44A]/65 backdrop-blur-sm p-10 rounded-xl shadow-md w-full max-w-2xl mt-28">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F2B56] text-center mb-8">
          Welcome Back!
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={form.name}
            onChange={handleChange}
            className="bg-[#F5F5F5] w-full p-3 rounded-lg text-sm outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-[#F5F5F5] w-full p-3 rounded-lg text-sm outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="bg-[#F5F5F5] w-full p-3 rounded-lg text-sm outline-none"
            required
          />
          <button
            type="submit"
            className="bg-[#0F2B56] hover:bg-[#0a2349] text-white w-full py-3 font-semibold rounded-lg transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[#0F2B56]">
          Belum punya akun?{" "}
          <span
            className="text-white hover:underline cursor-pointer font-semibold"
            onClick={() => navigate("/pendaftaran")}
          >
            Daftar Sekarang
          </span>
        </p>
      </div>
    </div>
  );
}
