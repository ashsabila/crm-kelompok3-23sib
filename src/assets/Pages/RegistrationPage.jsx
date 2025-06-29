import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoFocusFit from "../gambar/logoFocusFit.png";
import gymImage from "../gambar/bg-gym.png";

export default function RegistrationPage() {
  const [form, setForm] = useState({
    club: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    code: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const isEmailTaken = existingUsers.some((user) => user.email === email);
    if (isEmailTaken) {
      alert("Email sudah terdaftar. Silakan login.");
      return;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

    localStorage.setItem("userProfile", JSON.stringify({ name, email, role: "member" }));

    alert("Pendaftaran berhasil!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-[50%] h-[730px]">
        <img src={gymImage} alt="FocusFit Gym" className="w-full h-full object-cover" />
      </div>

      <div className="w-full md:w-1/2 bg-[#0F2B56] flex flex-col items-center justify-center p-6">
        <img src={logoFocusFit} alt="Logo" className="w-40 mb-6" />
        <div className="bg-[#D9B44A] p-8 rounded-lg w-full max-w-md">
          <h2 className="text-xl text-white font-bold text-center mb-6">Join Us</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="club"
              value={form.club}
              onChange={handleChange}
              required
              className="bg-[#F5F5F5] w-full p-3 rounded text-sm"
            >
              <option value="">Choose Club</option>
              <option value="Grand FocusFit - Karawang">Grand FocusFit - Karawang</option>
              <option value="Grand FocusFit - Pekanbaru">Grand FocusFit - Pekanbaru</option>
              <option value="FocusFit - Tuanku Tambusai">FocusFit - Tuanku Tambusai</option>
            </select>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="bg-[#F5F5F5] w-full p-3 rounded text-sm"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="bg-[#F5F5F5] w-full p-3 rounded text-sm"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="bg-[#F5F5F5] w-full p-3 rounded text-sm"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="bg-[#F5F5F5] w-full p-3 rounded text-sm"
            />

            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Redeem Code"
              className="bg-[#F5F5F5] w-full p-3 rounded text-sm"
            />

            <button
              type="submit"
              className="w-full bg-[#0F2B56] text-white font-semibold py-3 rounded hover:bg-[#0a2349]"
            >
              Sign Up Now
            </button>

            <p className="mt-1 text-sm text-center text-[#0F2B56]">
              Already have an account?{" "}
              <span
                className="text-blue-800 hover:underline cursor-pointer font-semibold"
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
