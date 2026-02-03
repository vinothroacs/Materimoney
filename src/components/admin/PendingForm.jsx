import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Check, X } from "lucide-react";
import { addNotification } from "../../Data/Notification";

const PendingForms = () => {
  JSON.parse(localStorage.getItem("pending_profiles"))

  const [pending, setPending] = useState([]);

  // LOAD PENDING
useEffect(() => {
  const loadPending = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:5000/api/admin/forms/pending",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setPending(data);
  };

  loadPending();
}, []);






  // ✅ ACCEPT

const handleAccept = async (item) => {
  const token = localStorage.getItem("token");

  await fetch(
    `http://localhost:5000/api/admin/approve/${item.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  toast.success("User approved & mail sent ✅");
};



  // ❌ REJECTa
const handleReject = async (item) => {
  const token = localStorage.getItem("token");

  await fetch(
    `http://localhost:5000/api/admin/reject/${item.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason: "Profile incomplete" }),
    }
  );

  toast.error("User rejected ❌");
};


  if (pending.length === 0) {
    return (
      <div className="p-10 text-center text-gray-400 font-black uppercase tracking-widest">
        No Pending Requests
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black text-[#3B1E54] uppercase">
        Pending User Requests
      </h2>

      <div className="grid gap-4">
        {pending.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
          >
            {/* USER INFO */}
            <div>
              <p className="text-sm font-black text-[#3B1E54]">
                {item.profile.fullName}
              </p>
              <p className="text-[11px] font-bold text-gray-400">
                {item.email}
              </p>
              <p className="text-[11px] font-bold text-gray-500 mt-1">
                📍 {item.profile.city}, {item.profile.country}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3">
              <button
                onClick={() => handleAccept(item)}
                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest"
              >
                <Check size={14} /> Accept
              </button>

              <button
                onClick={() => handleReject(item)}
                className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest"
              >
                <X size={14} /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingForms;
