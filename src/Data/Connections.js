// Connections.js
import { users } from "./Users"; // Users data-va inga import panrom

export const connections = [
  { id: 1, from: 2, to: 1, status: "Received", expiresAt: "2026-12-31" },
  { id: 2, from: 3, to: 1, status: "Received", expiresAt: "2026-12-31" },
  { id: 3, from: 1, to: 4, status: "Request Sent", expiresAt: "2026-12-31" },
  { id: 4, from: 1, to: 5, status: "Request Sent", expiresAt: "2026-12-31" },
];

// Helper function to find user details by ID
export const getUserById = (userId) => {
  return users.find((u) => u.id === userId);
};

export const showToast = (message) => {
  console.log(`Toast: ${message}`);
};