import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase"; // pastikan path sesuai

const FaqAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editId, setEditId] = useState(null);

  // Load FAQ dari Supabase saat komponen pertama kali dimount
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const { data, error } = await supabase.from("faq").select("*").order("created_at", { ascending: false });
    if (error) {
      console.error("Gagal mengambil data FAQ:", error.message);
    } else {
      setFaqs(data);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEdit = async () => {
    if (!form.question || !form.answer) return;

    if (editId) {
      const { error } = await supabase
        .from("faq")
        .update({ question: form.question, answer: form.answer })
        .eq("id", editId);

      if (error) {
        alert("Gagal mengupdate FAQ");
      }
    } else {
      const { error } = await supabase
        .from("faq")
        .insert([{ question: form.question, answer: form.answer }]);

      if (error) {
        alert("Gagal menambah FAQ");
      }
    }

    setForm({ question: "", answer: "" });
    setEditId(null);
    fetchFaqs();
  };

  const handleEdit = (faq) => {
    setForm({ question: faq.question, answer: faq.answer });
    setEditId(faq.id);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Apakah kamu yakin ingin menghapus FAQ ini?");
    if (!confirm) return;

    const { error } = await supabase.from("faq").delete().eq("id", id);
    if (error) {
      alert("Gagal menghapus FAQ");
    } else {
      fetchFaqs();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">🔧 Admin - Manajemen FAQ</h1>

      <div className="mb-6 space-y-3">
        <input
          type="text"
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Pertanyaan"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          placeholder="Jawaban"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAddOrEdit}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {editId ? "Simpan Perubahan" : "Tambah FAQ"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-3">📋 Daftar FAQ</h2>
      {faqs.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada data FAQ.</p>
      ) : (
        <ul className="space-y-4">
          {faqs.map((faq) => (
            <li key={faq.id} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">{faq.question}</p>
              <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(faq)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FaqAdmin;
