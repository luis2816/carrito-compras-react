// 📂 api/axiosInstance.ts
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_HOST}${import.meta.env.VITE_API_PREFIX}`,
});



export default api;
