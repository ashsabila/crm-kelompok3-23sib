import React from "react";
import { Link } from "react-router-dom";
import equipment from "../gambar/equipment.jpg";
import trainer from "../gambar/trainer.jpg";
import location from "../gambar/location.png";

export default function LandingPage() {
  return (
    <div className="bg-[#181B23] text-white font-sans">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-20 bg-cover bg-center" style={{ backgroundImage: `url('/landing-bg.jpg')` }}>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-[#C6A15B]">FocusFit Fitness Center</h1>
        <p className="max-w-xl text-lg md:text-xl text-gray-200 mb-8">
          Bangun tubuh ideal dan hidup sehat bersama kami. Daftar sekarang dan rasakan transformasi Anda!
        </p>
        <Link
          to="/pendaftaran"
          className="bg-[#C6A15B] hover:bg-[#a78345] text-white font-semibold py-3 px-6 rounded-full transition"
        >
          Daftar Sekarang
        </Link>
      </section>

      {/* Keunggulan */}
      <section className="bg-[#20242f] py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Kenapa Pilih FocusFit?</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <img src={trainer} alt="Trainer" className="w-70 h-50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pelatih Profesional</h3>
            <p className="text-gray-300">Latihan dengan arahan dari trainer bersertifikat dan berpengalaman.</p>
          </div>
          <div className="text-center">
            <img src={equipment} alt="Equipment" className="w-70 h-50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fasilitas Lengkap</h3>
            <p className="text-gray-300">Alat-alat modern dan lingkungan nyaman untuk semua jenis latihan.</p>
          </div>
          <div className="text-center">
            <img src={location} alt="Location" className="w-70 h-50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Lokasi Strategis</h3>
            <p className="text-gray-300">5 Cabang di Pekanbaru, mudah diakses dari mana saja.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#15171e] text-center py-6 text-sm text-gray-400">
        &copy; 2025 FocusFit Gym. All rights reserved.
      </footer>
    </div>
  );
}