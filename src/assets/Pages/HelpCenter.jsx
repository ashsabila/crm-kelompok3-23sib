import React from 'react';

const HelpCenter = () => {
  return (
    <div className="space-y-10">
      {/* Heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-purple-700">Pusat Bantuan & Komunikasi</h1>
        <p className="text-gray-600 mt-2 text-sm">Kami siap membantu Anda. Temukan jawaban atau hubungi kami.</p>
      </div>

      {/* FAQ */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">📚 Pertanyaan Umum (FAQ)</h2>
        <div className="space-y-3">
          <details className="group border-b pb-2">
            <summary className="cursor-pointer font-medium text-gray-800 group-open:text-purple-600">
              Bagaimana cara memperpanjang membership?
            </summary>
            <p className="text-sm text-gray-600 mt-1 ml-4">
              Login dan klik menu "Pengaturan Akun" lalu pilih "Perpanjang".
            </p>
          </details>
          <details className="group border-b pb-2">
            <summary className="cursor-pointer font-medium text-gray-800 group-open:text-purple-600">
              Bagaimana cara membatalkan booking?
            </summary>
            <p className="text-sm text-gray-600 mt-1 ml-4">
              Masuk ke menu "Riwayat Booking", lalu klik tombol "Batalkan".
            </p>
          </details>
        </div>
      </section>

      {/* Form Keluhan */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">📝 Form Keluhan</h2>
        <form className="grid gap-4 md:grid-cols-2">
          <div className="col-span-2">
            <input type="text" placeholder="Nama Lengkap" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          </div>
          <div className="col-span-2">
            <textarea placeholder="Tulis keluhan Anda..." className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" rows="5" required></textarea>
          </div>
          <div className="col-span-2 text-right">
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition">
              Kirim Keluhan
            </button>
          </div>
        </form>
      </section>

      {/* Email Tracking */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">📩 Lacak Tiket Email</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="email" placeholder="Email Anda" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" />
          <input type="text" placeholder="Kode Tiket" className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div className="mt-4 text-right">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">
            Cek Status
          </button>
        </div>
      </section>

      {/* Live Chat Placeholder */}
      <section className="bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">💬 Live Chat</h2>
        <p className="text-sm text-gray-600">
          Fitur live chat akan segera tersedia.<br />
          Untuk saat ini, silakan gunakan form keluhan atau email.
        </p>
      </section>
    </div>
  );
};

export default HelpCenter;
