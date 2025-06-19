import React, { useState } from "react";
import gym1 from '../gambar/gym1.jpg'

const PromoRoyalty = () => {
  const [showEmailContent, setShowEmailContent] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [points, setPoints] = useState(120);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [copied, setCopied] = useState(false);

  const handleViewDetail = (promo) => {
    setSelectedPromo(promo);
  };

  const handleJoin = () => {
    if (!joinedEvents.includes(selectedPromo.title)) {
      setPoints(points + 10);
      setJoinedEvents([...joinedEvents, selectedPromo.title]);
    }
  };

  const closeModal = () => {
    setSelectedPromo(null);
  };

  const isJoined = selectedPromo && joinedEvents.includes(selectedPromo.title);

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("FOCUS123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRedeem = () => {
    alert("🎁 Kamu berhasil menukarkan 100 poin untuk 1 sesi gratis!");
    setPoints(points - 100);
  };

  return (
    <div className="w-full px-0 py-10 min-h-screen bg-gray-50">
      <h2 className="text-4xl font-bold mb-10 text-center text-blue-700">
        🎯 Promo and Royalty
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-10">
        {/* Event-Based Marketing */}
        <div className="bg-white shadow-xl rounded-2xl p-6 min-h-[500px]">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            🎉 Event-Based Marketing
          </h3>

          {/* Promo 1 */}
          <div className="flex bg-gray-100 rounded-xl overflow-hidden shadow-md mb-8 min-h-[180px]">
            <img
              src={gym1}
              alt="June Fit Challenge"
              className="w-48 h-auto object-cover"
            />
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <span className="text-sm bg-green-200 px-3 py-1 rounded-full">
                  Monthly
                </span>
                <h4 className="text-xl font-bold mt-3 mb-2">
                  June Fit Challenge
                </h4>
                <p className="text-base text-gray-600 mb-3">
                  Periode: 1 – 30 Juni
                </p>
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md w-max"
                onClick={() =>
                  handleViewDetail({
                    title: "June Fit Challenge",
                    description:
                      "Tantangan kebugaran selama bulan Juni. Ikuti berbagai kelas olahraga dan dapatkan hadiah menarik!",
                    period: "1 – 30 Juni",
                    image:{gym1},
                  })
                }
              >
                View Detail
              </button>
            </div>
          </div>

          {/* Promo 2 */}
          <div className="flex bg-gray-100 rounded-xl overflow-hidden shadow-md min-h-[180px]">
            <img
              src={gym1}
              alt="Summer Body Goals"
              className="w-48 h-auto object-cover"
            />
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <span className="text-sm bg-pink-200 px-3 py-1 rounded-full">
                  Challenge
                </span>
                <h4 className="text-xl font-bold mt-3 mb-2">
                  Summer Body Goals
                </h4>
                <p className="text-base text-gray-600 mb-3">
                  Periode: 10 – 20 Juni
                </p>
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-5 py-2 rounded-md w-max"
                onClick={() =>
                  handleViewDetail({
                    title: "Summer Body Goals",
                    description:
                      "Bentuk tubuh ideal sebelum liburan! Ikuti program latihan intensif 10 hari.",
                    period: "10 – 20 Juni",
                    image:{gym1},
                  })
                }
              >
                View Detail
              </button>
            </div>
          </div>
        </div>

        {/* Referral & Loyalty */}
        <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col justify-start min-h-[500px] space-y-6">
          <h3 className="text-2xl font-semibold text-gray-800">
            🤝 Referral & Loyalty
          </h3>

          {/* Kode Referral */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Kode Referral Anda:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value="FOCUS123"
                readOnly
                className="bg-gray-100 p-2 px-3 rounded-md text-sm w-40"
              />
              <button
                onClick={handleCopyReferral}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
              >
                {copied ? "Tersalin!" : "Salin"}
              </button>
            </div>
          </div>

          {/* Progress Referral */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Referral Tercapai: 3 dari 5</p>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full w-3/5 transition-all duration-500"></div>
            </div>
            <p className="text-sm mt-1 text-green-700">
              🎁 2 lagi untuk dapat diskon 50%
            </p>
          </div>

          {/* Level Loyalty */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Level Loyalty:</p>
            <div className="inline-block px-3 py-1 bg-yellow-300 rounded-full text-sm font-medium">
              Silver Member
            </div>
          </div>

          {/* Riwayat Referral */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Kamu berhasil mengajak:</p>
            <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
              <li>Sarah (12 Juni)</li>
              <li>Dika (14 Juni)</li>
              <li>Rina (16 Juni)</li>
            </ul>
          </div>
        </div>

        {/* Point Redemption */}
        <div className="bg-white shadow-xl rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
          <h3 className="text-2xl font-semibold">🏆 Points & Rewards</h3>
          <div className="text-6xl font-bold text-blue-600">{points}</div>
          <p className="text-lg text-gray-600">Poin Tersedia</p>
          <button
            onClick={handleRedeem}
            disabled={points < 100}
            className={`mt-4 px-6 py-2 rounded-md text-white text-sm ${
              points >= 100
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Tukarkan 100 Poin 🎁
          </button>
        </div>

        {/* Email Promo */}
        <div className="bg-white shadow-xl rounded-2xl p-8 min-h-[300px]">
          <h3 className="text-2xl font-semibold mb-6">📧 Email Promo Log</h3>
          <div className="border rounded-lg p-6 bg-gray-100 space-y-4">
            <div className="flex justify-between text-base font-medium">
              <span>12 June</span>
              <span>Diskon 20%</span>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-base"
              onClick={() => setShowEmailContent(true)}
            >
              View Email
            </button>
          </div>
        </div>
      </div>

      {/* Modal Email */}
      {showEmailContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-10 w-full max-w-xl">
            <h3 className="text-2xl font-bold mb-4">Email Promo - 12 June</h3>
            <p className="text-base text-gray-700 mb-4 leading-relaxed">
              🎉 Nikmati diskon 20% untuk semua kelas selama bulan Juni! Promo
              berlaku mulai 12 Juni hingga akhir bulan. Yuk, manfaatkan
              promonya sekarang dan tetap aktif bersama FocusFit!
            </p>
            <div className="text-right">
              <button
                onClick={() => setShowEmailContent(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Detail Promo */}
      {selectedPromo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
            {selectedPromo.image && (
              <img
                src={selectedPromo.image}
                alt={selectedPromo.title}
                className="w-full h-auto object-cover rounded-md mb-6"
              />
            )}
            <h3 className="text-2xl font-bold mb-2">{selectedPromo.title}</h3>
            <p className="text-sm text-gray-500 mb-1">
              Periode: {selectedPromo.period}
            </p>
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              {selectedPromo.description}
            </p>

            {!isJoined ? (
              <button
                onClick={handleJoin}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
              >
                Join Event
              </button>
            ) : (
              <div className="text-green-700 font-semibold mb-4">
                ✅ Anda telah bergabung di event ini!
              </div>
            )}

            <div className="text-right mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoRoyalty;
