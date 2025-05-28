import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Bagaimana cara mendaftar sebagai member?",
    answer: "Anda bisa mendaftar langsung di resepsionis atau melalui aplikasi kami di halaman 'Sign Up'.",
  },
  {
    question: "Apa saja jenis kelas yang tersedia?",
    answer: "Kami menyediakan kelas Yoga, Zumba, Cardio, dan Strength Training setiap minggu.",
  },
  {
    question: "Bisakah saya membekukan keanggotaan?",
    answer: "Ya, keanggotaan bisa dibekukan maksimal 2 bulan dengan pemberitahuan sebelumnya.",
  },
  {
    question: "Apakah tersedia Personal Trainer?",
    answer: "Ya, Anda bisa booking sesi dengan personal trainer melalui aplikasi atau langsung ke staff.",
  },
  {
    question: "Apa kebijakan refund jika batal berlangganan?",
    answer: "Kami tidak memberikan refund setelah aktivasi, kecuali kondisi medis tertentu.",
  },
  {
    question: "Berapa jam operasional gym?",
    answer: "Gym buka setiap hari pukul 06.00 - 22.00.",
  },
  {
    question: "Apakah tersedia shower dan loker?",
    answer: "Ya, semua member mendapatkan akses ke loker dan shower secara gratis.",
  },
  {
    question: "Apakah tersedia paket keluarga?",
    answer: "Ya, kami menyediakan paket keluarga dengan diskon khusus.",
  },
  {
    question: "Bisakah saya mencoba gratis sebelum bergabung?",
    answer: "Tentu, Anda bisa mencoba free trial selama 1 hari.",
  },
  {
    question: "Bagaimana cara mengatur ulang password akun?",
    answer: "Klik tombol 'Lupa Password' di halaman login, lalu ikuti instruksi selanjutnya.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto my-16 px-8 py-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
  <h2 className="text-4xl font-extrabold text-center text-purple-600 mb-8">❓ Layanan Mandiri (FAQ)</h2>
  
  <div className="h-[500px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
    {faqs.map((faq, index) => (
      <div key={index} className="mb-6 border-b pb-3 transition-all duration-300">
        <button
          onClick={() => toggle(index)}
          className="w-full flex justify-between items-center py-4 text-left text-gray-800 text-lg font-semibold hover:text-purple-600 focus:outline-none"
        >
          <span>{faq.question}</span>
          {openIndex === index ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </button>
        {openIndex === index && (
          <div className="text-gray-600 pl-2 pr-1 pb-3 text-base transition-all duration-300 ease-in-out">
            {faq.answer}
          </div>
        )}
      </div>
    ))}
  </div>
</div>

  );
};

export default FaqSection;
