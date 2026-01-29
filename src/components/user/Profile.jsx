import React from "react";
import { users } from "../../Data/Users";

const Profile = () => {
  const user = users[0];

  return (
    <div className="bg-white p-6 rounded shadow w-96">
      <img src={user.photo} className="w-32 h-32 rounded-full mx-auto" />
      <h2 className="text-center mt-4 font-bold">{user.name}</h2>
      <p className="text-center text-gray-500">{user.gender}</p>
    </div>
  );
};

export default Profile;
