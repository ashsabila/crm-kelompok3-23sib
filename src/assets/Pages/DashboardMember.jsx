import React from "react";
import { useNavigate } from "react-router-dom";
import { FaNewspaper, FaArrowRight, FaBolt } from "react-icons/fa";
import yogaImg from "../gambar/yoga.jpg";
import zumbaImg from "../gambar/zumba.jpg";
import spinningImg from "../gambar/spinning.jpg";

const articles = [
  {
    title: "Manfaat Latihan Kekuatan untuk Kesehatan",
    url: "https://hellosehat.com/kebugaran/kebugaran-fisik/manfaat-latihan-kekuatan/",
    source: "HelloSehat",
  },
  {
    title: "Tips Diet Sehat dan Cepat",
    url: "https://www.alodokter.com/tips-diet-sehat-dan-cepat",
    source: "Alodokter",
  },
  {
    title: "Kenapa Olahraga Itu Penting?",
    url: "https://www.halodoc.com/artikel/kenapa-olahraga-itu-penting",
    source: "Halodoc",
  },
];

export default function DashboardMember() {
  const navigate = useNavigate();

  const goToClass = () => {
    navigate("/class");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">
        🏋️‍♀️ Welcome To FocusFit
      </h1>

      {/* Section: Artikel */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-700">
          <FaNewspaper /> Artikel Edukasi & Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition hover:bg-blue-50"
            >
              <h3 className="text-lg font-semibold text-blue-800 mb-1">{article.title}</h3>
              <p className="text-sm text-gray-500">Sumber: {article.source}</p>
              <div className="mt-3 text-sm text-blue-700 flex items-center gap-1">
                Baca Selengkapnya <FaArrowRight />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Section: Kelas Populer */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
            <FaBolt /> Kelas Populer Minggu Ini
          </h2>
          <button
            onClick={goToClass}
            className="text-blue-600 hover:underline text-sm font-medium"
          >
            Lihat Semua Kelas →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[yogaImg, zumbaImg, spinningImg].map((img, idx) => (
            <div
              key={idx}
              onClick={goToClass}
              className="cursor-pointer bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transition"
            >
              <img
                src={img}
                alt={`Class ${idx}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {["Yoga", "Zumba", "Spinning"][idx]}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {["Fleksibilitas & relaksasi.", "Dance seru & cardio.", "Latihan intens di sepeda."][idx]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Promo/Event (opsional link langsung) */}
      <section>
        <h2 className="text-xl font-semibold text-red-600 mb-4">🎉 Promo & Event Terbaru</h2>
        <div
          onClick={() => navigate("/PromoRoyalty")}
          className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg p-6 hover:scale-105 transition"
        >
          <h3 className="text-2xl font-bold">Gabung Event dan Dapatkan Poin Reward 🎁</h3>
          <p className="text-sm mt-2">Ikuti challenge dan referral untuk hadiah eksklusif dari FocusFit!</p>
        </div>
      </section>
    </div>
  );
}
