import React, { useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import yogaImg from "../../gambar/yoga.jpg";
import zumbaImg from "../../gambar/zumba.jpg";
import poundfitImg from "../../gambar/poundfit.jpg";
import pilatesImg from "../../gambar/pilates.jpg";
import aerobicImg from "../../gambar/aerobic.jpg";
import spinningImg from "../../gambar/spinning.jpg";
import muaithayImg from "../../gambar/muaithay.jpg";
import cardioImg from "../../gambar/cardio.jpg";
import TRXImg from "../../gambar/TRX.jpg";

const Class = () => {
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);

  const classList = [
    { title: "Yoga", type: "Cycling Studio", image: yogaImg, description: "Latihan pernapasan dan fleksibilitas." },
    { title: "Zumba", type: "Cycling Studio", image: zumbaImg, description: "Kelas dance cardio yang seru." },
    { title: "Pound Fit", type: "Functional Training", image: poundfitImg, description: "Latihan menggunakan drum stick." },
    { title: "Pilates", type: "Functional Training", image: pilatesImg, description: "Latihan postur dan core stability." },
    { title: "Aerobic", type: "Main Studio", image: aerobicImg, description: "Gerakan ritmis untuk stamina." },
    { title: "Spinning", type: "Main Studio", image: spinningImg, description: "Campuran teknik bela diri & fitness." },
    { title: "Muai Thay", type: "Main Studio", image: muaithayImg, description: "Latihan bela diri dari Thailand." },
    { title: "Cardio Dance", type: "Main Studio", image: cardioImg, description: "Menari sambil membakar kalori." },
    { title: "TRX", type: "Main Studio", image: TRXImg, description: "Latihan kekuatan dan ketahanan tubuh total." },
  ];

  return (
    <div className="flex flex-col bg-[#0D1B2A] min-h-screen text-black">
      {/* Hero Section */}
      <div className="bg-white px-6 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-800 font-medium">
              Keluarkan Potensi Anda Dengan Kelas Eksklusif Kami
            </p>
            <div className="flex items-center mt-2">
              <FaDumbbell className="text-[#D8B348] text-3xl mr-2" />
              <h2 className="text-3xl font-bold text-[#D8B348]">Kelas Olahraga</h2>
            </div>

            <div className="mt-10 space-y-6">
              {[["🎯 Variasi Kelas", "blue-700", "Beragam kelas dari HIIT hingga yoga untuk semua tingkat kebugaran."],
                ["🤝 Komunitas & Dukungan", "yellow-600", "Komunitas suportif yang saling membangun hidup sehat bersama."],
                ["🕒 Jadwal Fleksibel", "purple-700", "Kelas fleksibel, cocok untuk gaya hidup sibuk."],
                ["🏋️‍♂️ Fasilitas Terbaik", "cyan-700", "Lingkungan bersih dan nyaman untuk olahraga maksimal."]
              ].map(([title, color, desc], i) => (
                <div key={i} className="bg-white p-5 rounded-lg shadow">
                  <h2 className={`font-bold text-${color} mb-1`}>{title}</h2>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src={yogaImg} alt="Kelas Olahraga" className="rounded-xl w-full object-cover shadow-lg" />
          </div>
        </div>
      </div>

      {/* Daftar Kelas */}
      <div className="flex-1 px-6 py-12 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 px-4">
          {classList.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500 uppercase">{item.type}</p>
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                </div>
                <button
                  onClick={() =>
                    setSelectedClassIndex(index === selectedClassIndex ? null : index)
                  }
                  className="mt-4 bg-[#0D1B2A] text-white px-4 py-2 rounded hover:bg-blue-900 transition"
                >
                  {selectedClassIndex === index ? "Tutup Detail" : "See Detail"}
                </button>

                {selectedClassIndex === index && (
                  <p className="mt-3 text-sm text-gray-700 transition">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Class;
