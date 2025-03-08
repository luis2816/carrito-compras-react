import api from "./axiosInstance";

// Agregar producto al carrito
export const addToCart = async (productId: number): Promise<string> => {
  try {
    const response = await api.post("/cart", null, {
      params: { product_id: productId },
    });
    return response.data.message || "Producto agregado al carrito";
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al agregar producto al carrito");
  }
};

// Obtener productos del carrito
export const getCartProducts = async () => {
  try {
    const response = await api.get("/cart");
    return response.data.compras; // Devuelve directamente los productos
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error al obtener el carrito");
  }
};
