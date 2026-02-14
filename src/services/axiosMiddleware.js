

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL, 
  // http://localhost:5000/api/
});
console.log("AXIOS BASE URL 👉", import.meta.env.VITE_APP_API_URL);


axiosInstance.interceptors.request.use(
  (config) => {
    // ❌ auth routes-ku token attach panna vendam
    if (
      config.url.includes("/auth/login") ||
      config.url.includes("/auth/register")
    ) {
      return config;
    }

    const accesstoken = localStorage.getItem("accesstoken");
    const roleid = localStorage.getItem("roleid");

    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }

    if (roleid) {
      config.headers.roleid = Number(roleid);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
niw 

export default axiosInstance;
