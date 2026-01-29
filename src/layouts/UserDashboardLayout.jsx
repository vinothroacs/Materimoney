import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { performLogout } from "../Data/logout";
import toast from "react-hot-toast";

const UserDashboardLayout = ({
  user,
  showMenu,
  onAvatarClick,
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    toast((t) => (
      <div className="p-1">
        <p className="font-semibold mb-3 text-center text-[#3B1E54]">
          Logout செய்ய வேண்டுமா?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performLogout(navigate);
            }}
            className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1.5 bg-[#D4BEE4] text-[#3B1E54] rounded-lg hover:bg-[#c4accf]"
          >
            No
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-[#EEEEEE] flex font-sans antialiased overflow-x-hidden">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#3B1E54]/40 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - Using #3B1E54 (Dark Purple) */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 sm:w-72 bg-[#3B1E54] text-white flex flex-col shrink-0 shadow-2xl
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-8 sm:p-10 flex flex-col items-center">
          <div className="relative mb-4 group cursor-pointer" onClick={onAvatarClick}>
            <img
              src={user?.photo || "/default-avatar.png"}
              alt="user"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#9B7EBD]/30 object-cover shadow-2xl transition-transform group-hover:scale-105"
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#EEEEEE] rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 h-2 bg-[#3B1E54] rounded-full"></div>
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-medium opacity-95 text-center px-2">
            Welcome, <span className="font-bold text-[#D4BEE4]">{user?.name?.split(' ')[0] || "User"}</span>
          </h2>
        </div>

        <nav className="flex-1 mt-4">
          <ul className="space-y-1 pr-4 lg:pr-0">
            {[
              { name: "Dashboard", path: "/user/dashboard", icon: "📊" },
              { name: "My Connections", path: "/user/my-connection", icon: "🔗" }
            ].map((item) => (
              <li
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-4 py-4 px-8 sm:px-10 cursor-pointer transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-[#EEEEEE] text-[#3B1E54] font-bold rounded-r-full shadow-lg translate-x-2"
                    : "text-[#D4BEE4] hover:bg-[#9B7EBD]/20 hover:text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs sm:text-sm uppercase tracking-widest">{item.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 w-full relative">
        
        {/* TOP HEADER AREA */}
        <header className="px-4 sm:px-8 lg:px-12 py-6 sm:py-8 flex justify-between items-center bg-transparent gap-4">
          
          <button 
            className="lg:hidden p-2 bg-white rounded-xl shadow-sm text-[#3B1E54]"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>

          <div className="flex-1 hidden sm:block">
             <h1 className="text-lg sm:text-xl lg:text-2xl font-light text-[#9B7EBD] tracking-tight text-center truncate">
              Your personal profile info
             </h1>
          </div>

          <div className="relative">
            <div 
              onClick={onAvatarClick}
              className="flex items-center gap-2 cursor-pointer bg-white p-1 sm:p-1.5 rounded-full shadow-sm hover:shadow-md transition-all pr-3 sm:pr-4 border border-[#D4BEE4]"
            >
              <img
                src={user?.photo || "/default-avatar.png"}
                alt="user"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-[#9B7EBD]"
              />
              <span className="text-xs sm:text-sm font-bold text-[#3B1E54] truncate max-w-[80px] sm:max-w-[120px]">
                {user?.name}
              </span>
            </div>

            {showMenu && (
              <div className="absolute right-0 mt-3 w-44 sm:w-48 bg-white rounded-2xl shadow-2xl border border-[#D4BEE4] z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => navigate("/user/profile")}
                  className="w-full px-4 sm:px-5 py-3 text-left text-xs sm:text-sm text-[#3B1E54] hover:bg-[#D4BEE4]/30 transition-colors flex items-center gap-2"
                >
                  ✏️ Profile Settings
                </button>
                <div className="h-px bg-[#EEEEEE] mx-4 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 sm:px-5 py-3 text-left text-xs sm:text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* CONTENT CARD - Styled with #EEEEEE & #D4BEE4 borders */}
        <section className="flex-1 px-4 sm:px-8 lg:px-12 pb-6 sm:pb-12 overflow-hidden flex flex-col">
          <div className="bg-white flex-1 w-full rounded-[30px] sm:rounded-[45px] shadow-sm border border-white p-5 sm:p-8 lg:p-10 overflow-y-auto">
            <div className="max-w-6xl mx-auto h-full text-[#3B1E54]">
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboardLayout;