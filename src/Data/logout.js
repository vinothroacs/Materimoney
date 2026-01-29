export const performLogout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/");
};
