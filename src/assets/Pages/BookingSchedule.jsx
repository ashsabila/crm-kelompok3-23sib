import React, { useState } from "react";

const BookingSchedule = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [slotCounts, setSlotCounts] = useState({}); // key: "Yoga-7.00 AM" -> number of bookings
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

        {/* Tabs */}
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

        {/* Schedule */}
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

        {/* Booking History */}
        {activeTab === "history" && (
          <div className="mt-4 space-y-4">
            {bookingHistory.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border rounded-md p-4 shadow-sm bg-gray-50"
              >
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.time}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-600 font-medium">
                    {item.status}
                  </span>
                  <button className="text-blue-600 hover:underline">
                    Give Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reschedule Form */}
      {showRescheduleForm && (
        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Request Reschedule</h3>
          <form className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Select Class</label>
              <select className="w-full border rounded-md p-2">
                <option>Yoga</option>
                <option>Zumba</option>
                <option>HIIT</option>
                <option>Pilates</option>
                <option>Boxing</option>
                <option>Cardio Blast</option>
                <option>Restorative Yoga</option>
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
};

export default BookingSchedule;
