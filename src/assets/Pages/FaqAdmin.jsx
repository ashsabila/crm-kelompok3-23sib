import React, { useEffect, useState } from "react";

const FaqAdmin = () => {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: "", answer: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Load dari localStorage saat pertama kali
  useEffect(() => {
    const savedFaqs = localStorage.getItem("faqData");
    if (savedFaqs) {
      setFaqs(JSON.parse(savedFaqs));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("faqData", JSON.stringify(data));
    window.dispatchEvent(new Event("storage")); // Notify halaman lain
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.question || !form.answer) return;

    let updatedFaqs;
    if (editIndex !== null) {
      updatedFaqs = [...faqs];
      updatedFaqs[editIndex] = { ...form };
      setEditIndex(null);
    } else {
      updatedFaqs = [...faqs, form];
    }

    setFaqs(updatedFaqs);
    saveToStorage(updatedFaqs);
    setForm({ question: "", answer: "" });
  };

  const handleEdit = (index) => {
    setForm(faqs[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
    saveToStorage(updatedFaqs);
    setForm({ question: "", answer: "" });
    setEditIndex(null);
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
          onClick={handleAdd}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          {editIndex !== null ? "Simpan Perubahan" : "Tambah FAQ"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-3">📋 Daftar FAQ</h2>
      {faqs.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada data FAQ.</p>
      ) : (
        <ul className="space-y-4">
          {faqs.map((faq, index) => (
            <li key={index} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">{faq.question}</p>
              <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
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
