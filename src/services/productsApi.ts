import api from "./axiosInstance";

// Obtener lista de productos
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al obtener productos");
  }
};
