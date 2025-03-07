import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://bakenlarevels-main-ktuket.laravel.cloud/api/";
const endpoint = "products";

// Definir la estructura del producto
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity?: number; // Opcional, porque podría no venir en la API
}

// Definir la respuesta esperada
interface ApiResponse {
  data: Product[];
}

// Crear la instancia de Axios
const api = axios.create({
  baseURL: baseUrl,
});

// Interceptor para añadir el token de autorización
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Función para obtener los productos
const getProductos = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get<ApiResponse>(endpoint);
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener productos:", error);
    throw new Error(error.response?.data?.message || "Error al obtener productos");
  }
};

export default getProductos;
