import React from "react";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../components/user/UserDasboard";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/userdashboard" element={<UserDashboard />} />
    </Routes>
  );
};

export default UserRoutes;
