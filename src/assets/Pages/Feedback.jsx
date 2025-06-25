import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";

export default function Feedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [newFeedback, setNewFeedback] = useState({name: "", message: "", rating: 0});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFeedback((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating) => {
    setNewFeedback((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newFeedback.name || !newFeedback.message || newFeedback.rating === 0) return;

    const { error } = await supabase.from("feedback").insert([
      {
        name: newFeedback.name,
        pesan: newFeedback.message,
        rating: newFeedback.rating,
      },
    ]);

    if (error) {
      alert("Gagal menyimpan feedback: " + error.message);
    } else {
      alert("Feedback berhasil dikirim!");
      setNewFeedback({ name: "", message: "", rating: 0 });
      fetchFeedback(); // refresh data
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("feedback").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus: " + error.message);
    } else {
      setFeedbackList(feedbackList.filter((item) => item.id !== id));
    }
  };

  const fetchFeedback = async () => {
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching feedback:", error.message);
    } else {
      setFeedbackList(data);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const StarRating = ({ rating, onChange, editable = false }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-2xl ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => editable && onChange(i)}
          role={editable ? "button" : undefined}
          aria-label={editable ? `Set rating to ${i}` : undefined}
        >
          ★
        </span>
      );
    }
    return <div>{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6 text-white">
      <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 text-black shadow-md">
        <h2 className="text-2xl font-bold text-[#C6A15B] mb-4 text-center">
          Feedback Customer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block mb-1 font-medium">Nama</label>
            <input
              type="text"
              name="name"
              value={newFeedback.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-[#C6A15B]"
              placeholder="Masukkan nama Anda"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Pesan</label>
            <textarea
              name="message"
              value={newFeedback.message}
              onChange={handleChange}
              rows={4}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:border-[#C6A15B]"
              placeholder="Masukkan feedback Anda"
              required
            ></textarea>
          </div>
          <div>
            <label className="block mb-1 font-medium">Rating</label>
            <StarRating
              rating={newFeedback.rating}
              onChange={handleRatingChange}
              editable={true}
            />
            {newFeedback.rating === 0 && (
              <p className="text-red-500 text-sm mt-1">Harap pilih rating bintang</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#C6A15B] text-white px-6 py-2 rounded hover:bg-[#a78345] transition"
          >
            Kirim Feedback
          </button>
        </form>

        <h3 className="text-xl font-semibold mb-4">Daftar Feedback</h3>
        {feedbackList.length === 0 ? (
          <p className="text-gray-500">Belum ada feedback.</p>
        ) : (
          <ul className="space-y-4">
            {feedbackList.map((item) => (
              <li key={item.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-[#C6A15B]">{item.name}</h4>
                  <StarRating rating={item.rating} editable={false} />
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Hapus
                  </button>
                </div>
                <p className="text-gray-800">{item.pesan}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}