const BASE_URL = "https://materimoney-backend.onrender.com";

export const getImageUrl = (filename) => {
  if (!filename) return null;

  const cleanFilename = filename.trim(); // 🔥 removes \n, spaces
  return `${BASE_URL}/uploads/photos/${encodeURIComponent(cleanFilename)}`;
};

