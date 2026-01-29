import React, { useState } from "react";
import { connections, getUserById } from "../../Data/Connections";

const MyConnection = () => {
  const meId = 1; 
  const [toast, setToast] = useState({ show: false, msg: "" });

  const triggerToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  const received = connections.filter((c) => c.to === meId);
  const sent = connections.filter((c) => c.from === meId);

  return (
    <div className="p-4 sm:p-6 max-w-[1600px] mx-auto relative min-h-screen bg-[#FBFBFE]">
      
      {/* MODERN TOAST */}
      {toast.show && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 bg-[#3B1E54] text-white px-8 py-4 rounded-2xl shadow-2xl border border-[#9B7EBD] animate-bounce font-bold text-[12px] uppercase tracking-widest">
          ✨ {toast.msg}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* --- LEFT: RECEIVED (Enhanced with Dummy Content) --- */}
        <section className="w-full lg:w-[55%] space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[#D4BEE4] pb-2">
            <h2 className="text-[18px] font-black text-[#3B1E54] uppercase tracking-tighter">Received Connections</h2>
            <span className="text-[10px] font-bold text-[#9B7EBD]">REPLY PENDING</span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {received.map((c) => {
              const user = getUserById(c.from);
              return (
                <div 
                  key={c.id} 
                  onClick={() => triggerToast(`Opening ${user?.fullName}'s Profile...`)}
                  className="bg-white rounded-[32px] border border-[#EEEEEE] p-6 flex items-start gap-6 shadow-sm hover:shadow-xl transition-all cursor-pointer border-l-[10px] border-l-[#3B1E54] relative group"
                >
                  {/* Photo/Icon */}
                  <div className="w-20 h-20 rounded-[24px] bg-[#F3F0F7] flex-shrink-0 flex items-center justify-center border-2 border-[#D4BEE4] overflow-hidden">
                    {user?.photo ? (
                      <img src={user.photo} alt="user" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[#3B1E54] font-black text-2xl">{user?.fullName?.charAt(0)}</span>
                    )}
                  </div>
                  
                  {/* Info Section */}
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black text-[#3B1E54] text-[17px] tracking-tight">{user?.fullName}</h3>
                        <p className="text-[11px] font-bold text-[#9B7EBD] uppercase tracking-widest flex items-center gap-1">
                          <span className="text-[14px]">📍</span> {user?.city || "Chennai"}, India
                        </p>
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 italic">2h ago</div>
                    </div>

                    {/* TL presentation-ku indha dummy fields nalla irukkum */}
                    <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-dashed border-gray-100">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">🎓</span>
                        <span className="text-[10px] font-bold text-[#3B1E54] uppercase">{user?.education || "Professional"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-xs">💼</span>
                        <span className="text-[10px] font-bold text-[#3B1E54] uppercase truncate">{user?.occupation || "Software Field"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- RIGHT: SENT (Compact & Clean) --- */}
        <section className="w-full lg:w-[45%] space-y-6 bg-white/50 p-8 rounded-[40px] border border-[#EEEEEE] shadow-inner">
          <div className="flex items-center justify-between border-b border-gray-100 pb-2">
            <h2 className="text-[16px] font-black text-[#3B1E54]/70 uppercase tracking-tighter">Sent Requests</h2>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {sent.map((c) => {
              const user = getUserById(c.to);
              return (
                <div key={c.id} className="bg-white rounded-[28px] border border-[#EEEEEE] p-6 flex flex-col items-center text-center shadow-sm hover:border-[#D4BEE4] transition-all group">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#3B1E54] to-[#9B7EBD] p-1 mb-3">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-black text-[#3B1E54]">
                       {user?.fullName?.charAt(0)}
                    </div>
                  </div>
                  
                  <h3 className="font-black text-[#3B1E54] text-[14px] truncate w-full">{user?.fullName}</h3>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mb-4">Awaiting Response</p>
                  
                  <button 
                    onClick={() => triggerToast("Request Withdrawn")}
                    className="text-[9px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest border-t border-gray-50 w-full pt-4 transition-colors"
                  >
                    Cancel Request
                  </button>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default MyConnection;