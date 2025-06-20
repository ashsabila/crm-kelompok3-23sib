import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoFocusFit from "../gambar/logoFocusFit.png";
import bgGym from "../gambar/bg-login.png"; // ← ganti dengan gambar yang kamu pakai di login

export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.email && form.password) {
            alert("Login sukses!");
            navigate("/dashboard");
        } else {
            alert("Mohon isi email dan password!");
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${bgGym})` }}
        >
            <div className="text-center absolute top-50">
                <img src={logoFocusFit} alt="FocusFit Logo" className="mx-auto w-40" />
            </div>

            <div className="bg-[#D9B44A]/65 backdrop-blur-sm p-10 rounded-xl shadow-md w-full max-w-2xl mt-28">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F2B56] text-center mb-8">
                    Welcome Back!
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-4">
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
                </form>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-[#0F2B56] hover:bg-[#0a2349] text-white w-full py-3 font-semibold rounded-lg transition"
                >
                    Sign In
                </button>

                <p className="mt-4 text-sm text-center text-[#0F2B56]">
                    <span
                        className="text-white hover:underline cursor-pointer font-semibold"
                        onClick={() => navigate("/")}
                    >
                        Forgot Password?
                    </span>
                </p>
            </div>
        </div>
    );
}
