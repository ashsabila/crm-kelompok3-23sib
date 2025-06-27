import React, { useState, useEffect } from "react";

export default function BookingSchedule() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);

  const [bookingHistory, setBookingHistory] = useState(() => {
    const stored = localStorage.getItem("bookingHistory");
    return stored ? JSON.parse(stored) : [];
  });

  const [slotCounts, setSlotCounts] = useState(() => {
    const stored = localStorage.getItem("slotCounts");
    return stored ? JSON.parse(stored) : {};
  });

  const MAX_CAPACITY = 15;

  const schedule = {
    Monday: [
      { class: "Yoga", time: "7.00 AM" },
      { class: "Pilates", time: "10.00 AM" },
      { class: "Cardio", time: "5.00 PM" },
    ],
    Tuesday: [
      { class: "Zumba", time: "6.00 PM" },
      { class: "HIIT", time: "8.00 AM" },
      { class: "Boxing", time: "4.00 PM" },
    ],
    Wednesday: [
      { class: "HIIT", time: "10.00 AM" },
      { class: "Yoga", time: "7.00 AM" },
      { class: "Zumba", time: "6.00 PM" },
    ],
    Thursday: [
      { class: "Pilates", time: "8.00 AM" },
      { class: "Boxing", time: "5.00 PM" },
      { class: "Cardio", time: "7.00 PM" },
    ],
    Friday: [
      { class: "Boxing", time: "4.00 PM" },
      { class: "Zumba", time: "6.00 PM" },
      { class: "Yoga", time: "7.00 AM" },
    ],
    Saturday: [
      { class: "Cardio Blast", time: "9.00 AM" },
      { class: "Pilates", time: "11.00 AM" },
      { class: "HIIT", time: "1.00 PM" },
    ],
    Sunday: [
      { class: "Restorative Yoga", time: "5.00 PM" },
      { class: "Zumba", time: "9.00 AM" },
      { class: "Boxing", time: "3.00 PM" },
    ],
  };

  useEffect(() => {
    localStorage.setItem("bookingHistory", JSON.stringify(bookingHistory));
    localStorage.setItem("slotCounts", JSON.stringify(slotCounts));
  }, [bookingHistory, slotCounts]);

  const handleBooking = (className, time) => {
    const key = `${className}-${time}`;
    const currentCount = slotCounts[key] || 0;
    if (currentCount >= MAX_CAPACITY) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newBooking = {
      id: Date.now(),
      title: className,
      time: `${formattedDate}, ${time}`,
      status: "Booked",
    };

    setBookingHistory((prev) => [...prev, newBooking]);
    setSlotCounts((prev) => ({
      ...prev,
      [key]: currentCount + 1,
    }));
    alert(`${className} at ${time} has been booked.`);
    setActiveTab("history");
  };

  const updateBookingStatus = (id, status) => {
    setBookingHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const renderBookingCard = (title, status, colorClass) => {
    const filtered = bookingHistory.filter((b) => b.status === status);
    return (
      <div className={`border-l-4 ${colorClass} bg-white rounded-md shadow p-4`}>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {filtered.length === 0 ? (
          <p className="text-gray-400 italic">Belum ada data</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border rounded-md p-3 mb-2 bg-gray-50"
            >
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-gray-600">{item.time}</div>
              </div>
              <div className="flex gap-3 items-center">
                <span
                  className={`font-medium ${
                    item.status === "Cancelled"
                      ? "text-red-600"
                      : item.status === "Done"
                      ? "text-gray-500"
                      : "text-green-600"
                  }`}
                >
                  {item.status}
                </span>
                {item.status === "Booked" && (
                  <>
                    <button
                      onClick={() => updateBookingStatus(item.id, "Done")}
                      className="text-green-600 hover:underline text-sm"
                    >
                      Selesai
                    </button>
                    <button
                      onClick={() => updateBookingStatus(item.id, "Cancelled")}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Batal
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Booking & Schedule</h2>
          <button
            className="border px-4 py-2 rounded-md hover:bg-gray-100"
            onClick={() => setShowRescheduleForm(!showRescheduleForm)}
          >
            Request Reschedule
          </button>
        </div>

        <div className="flex border-b mb-4">
          <button
            className={`mr-4 pb-2 ${
              activeTab === "schedule"
                ? "border-b-2 border-black font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            Weekly Schedule
          </button>
          <button
            className={`pb-2 ${
              activeTab === "history"
                ? "border-b-2 border-black font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Booking History
          </button>
        </div>

        {activeTab === "schedule" && (
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 overflow-x-auto">
            {Object.entries(schedule).map(([day, classes]) => (
              <div
                key={day}
                className="min-w-[150px] border rounded-lg bg-gray-50 p-3"
              >
                <h3 className="text-center font-semibold mb-2">{day}</h3>
                {classes.map((item, idx) => {
                  const key = `${item.class}-${item.time}`;
                  const currentCount = slotCounts[key] || 0;
                  const isFull = currentCount >= MAX_CAPACITY;

                  return (
                    <div
                      key={idx}
                      onClick={() =>
                        !isFull && handleBooking(item.class, item.time)
                      }
                      className={`rounded-md p-2 mb-2 text-center transition cursor-pointer ${
                        isFull
                          ? "bg-red-100 text-gray-500 cursor-not-allowed"
                          : "bg-white hover:bg-blue-100 shadow-sm"
                      }`}
                    >
                      <div className="font-medium">{item.class}</div>
                      <div className="text-sm text-gray-600">{item.time}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {currentCount}/{MAX_CAPACITY} booked
                      </div>
                      <div
                        className={`text-xs font-semibold ${
                          isFull ? "text-red-500" : "text-green-600"
                        }`}
                      >
                        {isFull ? "Full" : "Available"}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {activeTab === "history" && (
          <div className="space-y-6 mt-6">
            {renderBookingCard("⏳ Booked Classes", "Booked", "border-green-500")}
            {renderBookingCard("✅ Completed Classes", "Done", "border-gray-400")}
            {renderBookingCard("❌ Cancelled Classes", "Cancelled", "border-red-500")}
          </div>
        )}
      </div>

      {showRescheduleForm && (
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Request Reschedule</h3>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Select Class</label>
              <select className="w-full border rounded-md p-2">
                {[
                  "Yoga",
                  "Zumba",
                  "HIIT",
                  "Pilates",
                  "Boxing",
                  "Cardio Blast",
                  "Restorative Yoga",
                ].map((cls, i) => (
                  <option key={i}>{cls}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Preferred Date</label>
              <input type="date" className="w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block font-medium mb-1">Preferred Time</label>
              <input type="time" className="w-full border rounded-md p-2" />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
