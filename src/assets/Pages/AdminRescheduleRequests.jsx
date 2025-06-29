import React, { useEffect, useState } from "react";

export default function AdminRescheduleRequests() {
  const [rescheduleRequests, setRescheduleRequests] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("rescheduleRequests");
    if (stored) {
      setRescheduleRequests(JSON.parse(stored));
    }
  }, []);

  const updateLocalStorage = (updatedRequests) => {
    setRescheduleRequests(updatedRequests);
    localStorage.setItem("rescheduleRequests", JSON.stringify(updatedRequests));
  };

  const addToNotifications = (req, status) => {
    const existingNotif = JSON.parse(localStorage.getItem("rescheduleNotifications")) || [];

    const newNotif = {
      id: req.id,
      message: `Permintaan reschedule untuk kelas ${req.className} pada ${req.date} pukul ${req.time} telah ${status === "Approved" ? "disetujui" : "ditolak"}.`,
      createdAt: new Date().toISOString(),
    };

    const updatedNotif = [...existingNotif, newNotif];
    localStorage.setItem("rescheduleNotifications", JSON.stringify(updatedNotif));
  };

  const handleDecision = (id, decision) => {
    const updated = rescheduleRequests.map((r) =>
      r.id === id ? { ...r, status: decision } : r
    );
    updateLocalStorage(updated);

    const decidedRequest = updated.find((r) => r.id === id);
    if (decidedRequest) {
      addToNotifications(decidedRequest, decision);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">📋 Permintaan Reschedule</h2>

      {rescheduleRequests.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada permintaan reschedule.</p>
      ) : (
        rescheduleRequests.map((req) => (
          <div
            key={req.id}
            className="border rounded-xl p-4 mb-5 bg-white shadow-md"
          >
            <p className="font-semibold text-lg text-blue-700">
              Kelas: <span className="text-gray-800">{req.className}</span>
            </p>
            <p className="text-gray-700">
              Tanggal & Waktu yang Diinginkan: <b>{req.date}</b> pukul <b>{req.time}</b>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Status:{" "}
              <span
                className={
                  req.status === "Approved"
                    ? "text-green-600 font-semibold"
                    : req.status === "Rejected"
                    ? "text-red-600 font-semibold"
                    : "text-yellow-600 font-semibold"
                }
              >
                {req.status}
              </span>
            </p>

            {req.status === "Pending" && (
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleDecision(req.id, "Approved")}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  ✅ Setujui
                </button>
                <button
                  onClick={() => handleDecision(req.id, "Rejected")}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  ❌ Tolak
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
