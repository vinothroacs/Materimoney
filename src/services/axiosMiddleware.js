// import axios from "axios";

// // ===============================
// // AXIOS INSTANCE
// // ===============================
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_APP_API_URL,
// });

// // ===============================
// // REQUEST INTERCEPTOR
// // ===============================
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const accesstoken = localStorage.getItem("accesstoken");
//     const roleid = localStorage.getItem("roleid");
//     const userid = localStorage.getItem("userid");

//     // 🔥 SENIOR BACKEND EXPECTS THIS
//     if (accesstoken) {
//       config.headers["auth"] = accesstoken;
//     }

//     // Optional headers (if backend needs)
//     if (roleid) {
//       config.headers["roleid"] = Number(roleid);
//     }

//     if (userid) {
//       config.headers["userid"] = Number(userid);
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ===============================
// // RESPONSE INTERCEPTOR (OPTIONAL)
// // ===============================
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Token expired / invalid
//     if (error.response?.status === 401) {
//       localStorage.removeItem("accesstoken");
//       localStorage.removeItem("roleid");
//       localStorage.removeItem("userid");

//       // Optional redirect
//       // window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, 
  // http://localhost:5000/api/
});
console.log("AXIOS BASE URL 👉", import.meta.env.VITE_APP_API_URL);


axiosInstance.interceptors.request.use(
  (config) => {
    const accesstoken = localStorage.getItem("accesstoken");
    const roleid = localStorage.getItem("roleid");
    const userid = localStorage.getItem("userid");

    if (accesstoken) config.headers["auth"] = accesstoken;
    if (roleid) config.headers["roleid"] = Number(roleid);
    if (userid) config.headers["userid"] = Number(userid);

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
