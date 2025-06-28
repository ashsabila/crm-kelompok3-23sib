import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function AdminFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal mengambil data:", error.message);
    } else {
      setFeedbackList(data);
    }
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">📋 Feedback dari Member</h2>

        {feedbackList.length === 0 ? (
          <p className="text-gray-600 text-center">Belum ada feedback dari member.</p>
        ) : (
          <ul className="space-y-5 max-h-[600px] overflow-y-auto pr-2">
            {feedbackList.map((item) => (
              <li key={item.id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-blue-800">{item.name}</h4>
                  <StarRating rating={item.rating} />
                </div>
                <p className="text-gray-700">{item.pesan}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
