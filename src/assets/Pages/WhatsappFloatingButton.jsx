import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappFloatingButton = () => {
  const phoneNumber = '6282288486643'; // Ganti dengan nomor WA asli kamu
  const message = 'Halo, saya tertarik dengan layanan Grand Focus Fit. Mohon infonya ya!';

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
    >
      <FaWhatsapp className="text-2xl" />
    </button>
  );
};

export default WhatsappFloatingButton;
