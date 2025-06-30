import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "../../supabase"; // Pastikan path sesuai

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data, error } = await supabase.from("faq").select("*").order("created_at", { ascending: false });
      if (error) {
        console.error("Gagal mengambil data FAQ:", error.message);
      } else {
        setFaqs(data);
      }
    };

    fetchFaqs();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto my-16 px-8 py-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-purple-600 mb-8">
        ❓ Layanan Mandiri (FAQ)
      </h2>

      <div className="h-[500px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-gray-100">
        {faqs.length === 0 ? (
          <p className="text-gray-500 italic text-center">Belum ada data FAQ.</p>
        ) : (
          faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="mb-6 border-b pb-3 transition-all duration-300"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center py-4 text-left text-gray-800 text-lg font-semibold hover:text-purple-600 focus:outline-none"
              >
                <span>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp size={22} />
                ) : (
                  <ChevronDown size={22} />
                )}
              </button>
              {openIndex === index && (
                <div className="text-gray-600 pl-2 pr-1 pb-3 text-base transition-all duration-300 ease-in-out">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FaqSection;
