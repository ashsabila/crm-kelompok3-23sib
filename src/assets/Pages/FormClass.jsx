import React, { useState, useEffect, useRef } from "react";

export default function FormClass() {
  const [classList, setClassList] = useState(() => {
    const stored = localStorage.getItem("classList");
    return stored ? JSON.parse(stored) : [];
  });

  const [trainerList, setTrainerList] = useState(() => {
    const stored = localStorage.getItem("trainerList");
    return stored ? JSON.parse(stored) : [];
  });

  const [newClass, setNewClass] = useState({
    name_class: "",
    jenis_ruangan: "",
    detail_ruangan: "",
    image: "",
  });

  const [newTrainer, setNewTrainer] = useState({
    name: "",
    specialty: "",
    bio: "",
    image: "",
  });

  const [editingClassId, setEditingClassId] = useState(null);
  const [editingTrainerId, setEditingTrainerId] = useState(null);

  const classImageInput = useRef();
  const trainerImageInput = useRef();

  useEffect(() => {
    localStorage.setItem("classList", JSON.stringify(classList));
  }, [classList]);

  useEffect(() => {
    localStorage.setItem("trainerList", JSON.stringify(trainerList));
  }, [trainerList]);

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "class") {
      setNewClass((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewTrainer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "class") {
        setNewClass((prev) => ({ ...prev, image: reader.result }));
      } else {
        setNewTrainer((prev) => ({ ...prev, image: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerImageUpload = (type) => {
    if (type === "class") {
      classImageInput.current.click();
    } else {
      trainerImageInput.current.click();
    }
  };

  const handleSubmitClass = (e) => {
    e.preventDefault();
    const { name_class, jenis_ruangan, detail_ruangan } = newClass;
    if (!name_class || !jenis_ruangan || !detail_ruangan) return;

    if (editingClassId) {
      setClassList((prev) =>
        prev.map((item) => (item.id === editingClassId ? { ...newClass, id: editingClassId } : item))
      );
      setEditingClassId(null);
    } else {
      setClassList([{ ...newClass, id: Date.now() }, ...classList]);
    }

    setNewClass({ name_class: "", jenis_ruangan: "", detail_ruangan: "", image: "" });
  };

  const handleSubmitTrainer = (e) => {
    e.preventDefault();
    const { name, specialty, bio } = newTrainer;
    if (!name || !specialty || !bio) return;

    if (editingTrainerId) {
      setTrainerList((prev) =>
        prev.map((t) => (t.id === editingTrainerId ? { ...newTrainer, id: editingTrainerId } : t))
      );
      setEditingTrainerId(null);
    } else {
      setTrainerList([{ ...newTrainer, id: Date.now() }, ...trainerList]);
    }

    setNewTrainer({ name: "", specialty: "", bio: "", image: "" });
  };

  const handleEditClass = (item) => {
    setNewClass(item);
    setEditingClassId(item.id);
  };

  const handleDeleteClass = (id) => {
    setClassList(classList.filter((c) => c.id !== id));
  };

  const handleEditTrainer = (trainer) => {
    setNewTrainer(trainer);
    setEditingTrainerId(trainer.id);
  };

  const handleDeleteTrainer = (id) => {
    setTrainerList(trainerList.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#C6A15B] mb-6">Form Class & Trainer</h2>

        {/* ===== FORM CLASS ===== */}
        <form onSubmit={handleSubmitClass} className="space-y-4 mb-10">
          <h3 className="text-lg font-semibold">Tambah Class</h3>
          <input
            type="text"
            name="name_class"
            placeholder="Nama Class"
            value={newClass.name_class}
            onChange={(e) => handleChange(e, "class")}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="jenis_ruangan"
            placeholder="Jenis Ruangan"
            value={newClass.jenis_ruangan}
            onChange={(e) => handleChange(e, "class")}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="detail_ruangan"
            placeholder="Detail Ruangan"
            value={newClass.detail_ruangan}
            onChange={(e) => handleChange(e, "class")}
            rows={3}
            className="w-full border px-4 py-2 rounded"
          />

          {/* Upload Button Gambar Class */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => triggerImageUpload("class")}
              className="border border-[#C6A15B] text-[#C6A15B] px-4 py-2 rounded hover:bg-[#fff3e0]"
            >
              Upload Gambar
            </button>
            {newClass.image && (
              <img src={newClass.image} alt="Preview" className="h-24 w-32 object-cover rounded" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={classImageInput}
            onChange={(e) => handleImageUpload(e, "class")}
            className="hidden"
          />

          <button
            type="submit"
            className="bg-[#C6A15B] text-white px-6 py-2 rounded hover:bg-[#a78345]"
          >
            {editingClassId ? "Update" : "Simpan"} Class
          </button>
        </form>

        {/* ===== LIST CLASS ===== */}
        <ul className="space-y-4 mb-10">
          {classList.map((c) => (
            <li key={c.id} className="border p-4 rounded flex justify-between bg-gray-50">
              <div>
                <h4 className="font-bold text-[#C6A15B]">{c.name_class}</h4>
                <p className="text-sm text-gray-600">{c.jenis_ruangan}</p>
                <p>{c.detail_ruangan}</p>
                {c.image && <img src={c.image} alt={c.name_class} className="mt-2 h-24 w-32 rounded object-cover" />}
              </div>
              <div className="space-y-1 text-right">
                <button onClick={() => handleEditClass(c)} className="text-blue-600 text-sm">Edit</button>
                <button onClick={() => handleDeleteClass(c.id)} className="text-red-600 text-sm">Hapus</button>
              </div>
            </li>
          ))}
        </ul>

        {/* ===== FORM TRAINER ===== */}
        <form onSubmit={handleSubmitTrainer} className="space-y-4 mb-10">
          <h3 className="text-lg font-semibold">Tambah Trainer</h3>
          <input
            type="text"
            name="name"
            placeholder="Nama Trainer"
            value={newTrainer.name}
            onChange={(e) => handleChange(e, "trainer")}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            name="specialty"
            placeholder="Keahlian"
            value={newTrainer.specialty}
            onChange={(e) => handleChange(e, "trainer")}
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={newTrainer.bio}
            onChange={(e) => handleChange(e, "trainer")}
            rows={3}
            className="w-full border px-4 py-2 rounded"
          />

          {/* Upload Button Gambar Trainer */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => triggerImageUpload("trainer")}
              className="border border-[#C6A15B] text-[#C6A15B] px-4 py-2 rounded hover:bg-[#fff3e0]"
            >
              Upload Foto Trainer
            </button>
            {newTrainer.image && (
              <img src={newTrainer.image} alt="Preview" className="h-24 w-24 object-cover rounded-full" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={trainerImageInput}
            onChange={(e) => handleImageUpload(e, "trainer")}
            className="hidden"
          />

          <button
            type="submit"
            className="bg-[#C6A15B] text-white px-6 py-2 rounded hover:bg-[#a78345]"
          >
            {editingTrainerId ? "Update" : "Simpan"} Trainer
          </button>
        </form>

        {/* ===== LIST TRAINER ===== */}
      
        <ul className="space-y-4">
          {trainerList.map((t) => (
            <li key={t.id} className="border p-4 rounded flex justify-between bg-gray-50">
              <div>
                <h4 className="font-bold text-[#C6A15B]">{t.name}</h4>
                <p className="text-sm text-gray-600">{t.specialty}</p>
                <p>{t.bio}</p>
                {t.image && <img src={t.image} alt={t.name} className="mt-2 h-24 w-24 rounded-full object-cover" />}
              </div>
              <div className="space-y-1 text-right">
                <button onClick={() => handleEditTrainer(t)} className="text-blue-600 text-sm">Edit</button>
                <button onClick={() => handleDeleteTrainer(t.id)} className="text-red-600 text-sm">Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
