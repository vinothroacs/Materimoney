import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserById, updateUser, deleteUser } from "../../Data/UpdateProfile";
import { toast } from "react-toastify";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = getUserById(Number(id));
  const [user, setUser] = useState(userData);

  if (!user) return <h2 className="text-center mt-10">User not found</h2>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSave = () => {
    updateUser(user);
    toast.success("Profile updated successfully ✅");
  };

  const handleDelete = () => {
    deleteUser(user.id);
    toast.error("Profile deleted ❌");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user.photo || "https://via.placeholder.com/150"}
            alt={user.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Profile
        </h2>

        {/* Inputs */}
        <div className="space-y-3">
          <input
            type="text"
            name="fullName"
            value={user.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="city"
            value={user.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="education"
            value={user.education}
            onChange={handleChange}
            placeholder="Education"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="occupation"
            value={user.occupation}
            onChange={handleChange}
            placeholder="Occupation"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Save
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
