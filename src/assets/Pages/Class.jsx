import React, { useState, useEffect } from "react";
import { FaDumbbell } from "react-icons/fa";
import yogaImg from "../gambar/yoga.jpg";
import zumbaImg from "../gambar/zumba.jpg";
import poundfitImg from "../gambar/poundfit.jpg";
import pilatesImg from "../gambar/pilates.jpg";
import aerobicImg from "../gambar/aerobic.jpg";
import spinningImg from "../gambar/spinning.jpg";
import muaithayImg from "../gambar/muaithay.jpg";
import cardioImg from "../gambar/cardio.jpg";
import TRXImg from "../gambar/TRX.jpg";
import Trainer1 from "../gambar/trainer1.png";
import Trainer2 from "../gambar/trainer2.png";
import Trainer3 from "../gambar/trainer3.png";
import Trainer4 from "../gambar/trainer4.png";
import Trainer5 from "../gambar/trainer5.png";
import Trainer6 from "../gambar/trainer6.png";

const Class = () => {
  const [selectedClassIndex, setSelectedClassIndex] = useState(null);
  const [storedClasses, setStoredClasses] = useState([]);
  const [storedTrainers, setStoredTrainers] = useState([]);

  useEffect(() => {
    const storedClassData = localStorage.getItem("classList");
    if (storedClassData) setStoredClasses(JSON.parse(storedClassData));

    const storedTrainerData = localStorage.getItem("trainerList");
    if (storedTrainerData) setStoredTrainers(JSON.parse(storedTrainerData));
  }, []);

  const classList = [
    { title: "Yoga", type: "Cycling Studio", image: yogaImg, description: "Latihan pernapasan dan fleksibilitas." },
    { title: "Zumba", type: "Cycling Studio", image: zumbaImg, description: "Kelas dance cardio yang seru." },
    { title: "Pound Fit", type: "Functional Training", image: poundfitImg, description: "Latihan menggunakan drum stick." },
    { title: "Pilates", type: "Functional Training", image: pilatesImg, description: "Latihan postur dan core stability." },
    { title: "Aerobic", type: "Main Studio", image: aerobicImg, description: "Gerakan ritmis untuk stamina." },
    { title: "Spinning", type: "Main Studio", image: spinningImg, description: "Latihan sepeda dalam ruangan dengan intensitas tinggi." },
    { title: "Muai Thay", type: "Main Studio", image: muaithayImg, description: "Latihan bela diri dari Thailand." },
    { title: "Cardio Dance", type: "Main Studio", image: cardioImg, description: "Menari sambil membakar kalori." },
    { title: "TRX", type: "Main Studio", image: TRXImg, description: "Latihan kekuatan dan ketahanan tubuh total." },
    ...storedClasses.map((item) => ({
      title: item.name_class,
      type: item.jenis_ruangan,
      description: item.detail_ruangan,
      image: item.image || cardioImg,
    })),
  ];

  const trainerList = [
    {
      name: "Rina Andriani",
      specialty: "Yoga & Pilates",
      image: Trainer1,
      bio: "Rina adalah instruktur bersertifikat dengan 5 tahun pengalaman di bidang Yoga dan Pilates. Ia fokus pada keseimbangan tubuh dan pikiran."
    },
    {
      name: "Dika Surya",
      specialty: "Zumba & Cardio",
      image: Trainer2,
      bio: "Dika membawa energi tinggi ke setiap kelasnya. Ia memiliki latar belakang dance dan menyukai sesi latihan yang menyenangkan."
    },
    {
      name: "Sarah Putri",
      specialty: "TRX & PoundFit",
      image: Trainer3,
      bio: "Sarah adalah pelatih kekuatan dan ketahanan dengan gaya melatih yang dinamis dan menantang."
    },
    {
      name: "Kevin Hadi",
      specialty: "Boxing & HIIT",
      image: Trainer4,
      bio: "Kevin adalah mantan atlet tinju nasional yang kini fokus melatih teknik bela diri dan kekuatan melalui HIIT."
    },
    {
      name: "Winda Lestari",
      specialty: "Cardio Dance & Aerobic",
      image: Trainer5,
      bio: "Winda menyatukan ritme dan kebugaran dalam kelasnya. Cocok bagi kamu yang suka latihan sambil menari."
    },
    {
      name: "Budi Santosa",
      specialty: "Functional Training",
      image: Trainer6,
      bio: "Budi percaya bahwa kebugaran adalah gaya hidup. Ia membantu member memahami teknik gerakan yang benar dan efisien."
    },
    ...storedTrainers.map((t) => ({
      name: t.name,
      specialty: t.specialty,
      bio: t.bio,
      image: t.image || Trainer6
    }))
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
              {["🎯 Variasi Kelas", "🤝 Komunitas & Dukungan", "🕒 Jadwal Fleksibel", "🏋️‍♂️ Fasilitas Terbaik"].map((title, i) => (
                <div key={i} className="bg-white p-5 rounded-lg shadow">
                  <h2 className="font-bold text-blue-700 mb-1">{title}</h2>
                  <p>Keterangan dari {title}</p>
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
        <h2 className="text-2xl font-bold text-center text-[#0D1B2A] mb-8">📋 Daftar Kelas</h2>
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
                  {selectedClassIndex === index ? "Tutup Detail" : "Lihat Detail"}
                </button>
                {selectedClassIndex === index && (
                  <p className="mt-3 text-sm text-gray-700 transition">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Daftar Pelatih */}
        <h2 className="text-2xl font-bold text-center text-[#0D1B2A] mb-6">👩‍🏫 Pelatih Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {trainerList.map((trainer, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
              <img src={trainer.image} alt={trainer.name} className="w-28 h-28 rounded-full object-cover mb-4" />
              <h3 className="text-lg font-bold text-[#0D1B2A]">{trainer.name}</h3>
              <p className="text-sm text-yellow-600 font-medium">{trainer.specialty}</p>
              <p className="text-sm text-gray-600 mt-2">{trainer.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Class;
