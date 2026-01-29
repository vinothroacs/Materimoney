import React, { useState } from "react";

const NotificationBell = ({ notifications }) => {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        🔔 {unread > 0 && <span>({unread})</span>}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow rounded-xl p-3">
          {notifications.map(n => (
            <p key={n.id} className="text-sm border-b py-1">
              {n.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
