import React, { useState, useEffect } from "react";
import { Typography, Spin, Alert, message, Button} from "antd";
import CartButton from "./cart/CartButton";
import CartDrawer from "./cart/CartDrawer";
import ProductList from "./products/ProductList";
import BestCombination from "./products/BestCombination";
import { getProducts } from "../services/productsApi";
import { addToCart, getCartProducts } from "../services/cardApi";
import { DeleteOutlined } from "@ant-design/icons"; 
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]); // 🔥 Ahora siempre es un array
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // 🔥 Nuevo estado para la mejor combinación
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Cargar productos desde la API al montar el componente
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      if (response?.data && Array.isArray(response.data)) {
        const transformedProducts: Product[] = response.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 0,
        }));

        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts); // Inicialmente mostrar todos
      } else {
        console.warn("La respuesta no contiene productos válidos:", response);
        setError("No se encontraron productos.");
      }
    } catch (err: any) {
      console.error("Error al cargar productos:", err);
      setError(err.message || "Error al cargar productos.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts(); // Cargar la lista de productos
    fetchCart(); // 🔥 También cargamos el carrito al montar el componente
  }, []);

  // 📌 Obtener los productos del carrito
  const fetchCart = async () => {
    try {
      const cartData = await getCartProducts();
      setCart(cartData);
    } catch (error: any) {
      console.error("Error al obtener el carrito:", error.message);
    }
  };

  // 🛒 Agregar producto al carrito
  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id); // Usa el ID del producto
      message.success(`🛒 ${product.name} agregado al carrito exitosamente`);
      fetchCart(); // Actualizar el carrito después de agregar un producto
    } catch (error: any) {
      console.error("Error al agregar producto al carrito:", error.message);
    }
  };


  // 🔄 Actualizar cantidad en el carrito manualmente
  const updateQuantity = (productId: number, amount: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* 🔘 Botón flotante del carrito */}
      <CartButton
        itemCount={cart?.reduce((total, item) => total + item.quantity, 0) || 0} 
        onClick={() => setDrawerVisible(true)}
      />

      {/* 🏷️ Título */}
      <Typography.Title level={2} style={{ marginBottom: "20px", textAlign: "center" }}>
        Lista de Productos
      </Typography.Title>

      {/* 📌 Contenedor de botones alineados */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
    {/* 🧮 Botón para calcular mejor combinación */}
    <BestCombination products={products} onBestCombination={setFilteredProducts} />

    {/* 🗑️ Botón para limpiar */}
    <Button
        type="primary"
        style={{
            backgroundColor: "rgba(106, 100, 100, 0.85)",
            borderColor: "rgba(106, 100, 100, 0.85)",
            borderRadius: "50px",
            padding: "10px 20px",
            fontWeight: "bold",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Centrar icono y texto
            gap: "8px",
            height: "42px", // Asegurar altura uniforme
            minWidth: "120px", // Asegurar tamaño uniforme
        }}
        onClick={() => fetchProducts()}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F58382")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#807B7B")}
    >
        <DeleteOutlined />
        Limpiar
    </Button>
</div>


      {/* 📦 Contenedor de productos */}
      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#f9f9f9",
          margin: "0 auto",
          minHeight: "200px"
        }}
      >
        {loading ? (
          <Spin size="large" style={{ display: "block", textAlign: "center", margin: "20px 0" }} />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
        )}
      </div>

      {/* 🛍️ Drawer del carrito */}
      <CartDrawer
        cart={cart}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onUpdateQuantity={updateQuantity}
      />
    </div>
);
};

export default ShoppingCart;
