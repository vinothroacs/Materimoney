


// import { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import axiosInstance from "../services/axiosMiddleware";
// import { registerUser, loginUser } from "../services/authService";

// import axios from "axios";

// export const useAuthForm = () => {
//   const navigate = useNavigate();
//   const isSubmittingRef = useRef(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     mobileNumber: "",
//     email: "",
//     password: "",
//   });

//   // =====================
//   // INPUT CHANGE
//   // =====================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // =====================
//   // REGISTER
//   // =====================
//   const handleRegisterSubmit = async (e, onNavigate) => {
//     e.preventDefault();

//     if (isSubmittingRef.current) return;
//     isSubmittingRef.current = true;

//     try {
//       const res = await axios.post("auth/register", {
//         name: formData.fullName,
//         phone: formData.mobileNumber,
//         email: formData.email,
//         password: formData.password,
//       });

//       toast.success(res.data.message || "🎉 Registration successful");

//       setTimeout(() => {
//         isSubmittingRef.current = false;
//         if (onNavigate) onNavigate(); // go to login page
//       }, 800);
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Registration failed"
//       );
//       isSubmittingRef.current = false;
//     }
//   };

//   // =====================
//   // LOGIN
//   // =====================
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();

//     if (isSubmittingRef.current) return;
//     isSubmittingRef.current = true;

//     try {
//       const res = await axiosInstance.post("auth/login", {
//         email: formData.email,
//         password: formData.password,
//       });

//       const { response, roleid, userid } = res.data;

//       // 🔥 STORE AUTH DATA (SENIOR STYLE)
//       localStorage.setItem("accesstoken", response);
//       localStorage.setItem("roleid", roleid);
//       localStorage.setItem("userid", userid);

//       toast.success("✅ Login successful");

//       setTimeout(() => {
//         isSubmittingRef.current = false;

//         if (Number(roleid) === 1) {
//           navigate("/admin");
//         } else {
//           navigate("/form");
//         }
//       }, 800);
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Login failed"
//       );
//       isSubmittingRef.current = false;
//     }
//   };

//   // =====================
//   // RETURN
//   // =====================
//   return {
//     formData,
//     handleChange,
//     handleRegisterSubmit,
//     handleLoginSubmit,
//   };
// };


import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser, loginUser } from "../services/authService";

export const useAuthForm = () => {
  const navigate = useNavigate();
  const isSubmittingRef = useRef(false);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    email: "",
    password: "",
  });

  // =====================
  // INPUT CHANGE
  // =====================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // =====================
  // REGISTER
  // =====================
  const handleRegisterSubmit = async (e, onNavigate) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      const res = await registerUser({
        name: formData.fullName,
        phone: formData.mobileNumber,
        email: formData.email,
        password: formData.password,
      });

      toast.success(res.data.message || "🎉 Registration successful");

      setTimeout(() => {
        isSubmittingRef.current = false;
        if (onNavigate) onNavigate();
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      isSubmittingRef.current = false;
    }
  };

  // =====================
  // LOGIN (EMAIL OR MOBILE)
  // =====================
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      const res = await loginUser({
        email: formData.email, // email OR mobile number
        password: formData.password,
      });

      const { response, roleid, userid } = res.data;

      localStorage.setItem("accesstoken", response);
      localStorage.setItem("roleid", roleid);
      localStorage.setItem("userid", userid);

      toast.success("✅ Login successful");

      setTimeout(() => {
        isSubmittingRef.current = false;
        if (Number(roleid) === 1) {
          navigate("/admin");
        } else {
          navigate("/form");
        }
      }, 800);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      isSubmittingRef.current = false;
    }
  };

  return {
    formData,
    handleChange,
    handleRegisterSubmit,
    handleLoginSubmit,
  };
};
