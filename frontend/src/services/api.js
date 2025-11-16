import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3080/api";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// AUTH API
export const authAPI = {
  register: (userData) =>
    API.post("/auth/register", userData).then((res) => res.data),

  login: (credentials) =>
    API.post("/auth/login", credentials).then((res) => res.data),
};

// SWEETS API
export const sweetsAPI = {
  getAll: () => API.get("/sweets").then((res) => res.data),

  search: (params) =>
    API.get("/sweets/search", { params }).then((res) => res.data),

  create: (sweetData) => API.post("/sweets", sweetData).then((res) => res.data),

  update: (id, sweetData) =>
    API.put(`/sweets/${id}`, sweetData).then((res) => res.data),

  delete: (id) => API.delete(`/sweets/${id}`).then((res) => res.data),

  purchase: (id) => API.post(`/sweets/${id}/purchase`).then((res) => res.data),

  restock: (id, amount) =>
    API.post(`/sweets/${id}/restock`, { amount }).then((res) => res.data),
};
