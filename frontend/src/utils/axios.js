import axios from "axios";

const api = axios.create({
  baseURL: "https://earbuddies-1.onrender.com/api",
});

// Auto attach JWT to every request
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
