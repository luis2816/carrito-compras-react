import React, { useState, useEffect } from "react";
import { Typography, Spin, Alert } from "antd";
import CartButton from "./cart/CartButton";
import CartDrawer from "./cart/CartDrawer";
import ProductList from "./products/ProductList";
import getProductos from "../services/Product";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Cargar productos desde la API al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductos();

        if (response?.data && Array.isArray(response.data)) {
          console.log("Respuesta exitosa:", response);
          
          const transformedProducts: Product[] = response.data.map((product: any) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || "", // Asegurar que siempre tenga un string
            quantity: 0,
          }));

          setProducts(transformedProducts);
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

    fetchProducts();
  }, []);

  // 🛒 Agregar al carrito
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 🔄 Actualizar cantidad en el carrito
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
        itemCount={cart.reduce((total, item) => total + item.quantity, 0)}
        onClick={() => setDrawerVisible(true)}
      />

      {/* 🏷️ Título */}
      <Typography.Title level={2} style={{ marginBottom: "20px", textAlign: "center" }}>
        Productos
      </Typography.Title>

      {/* 📦 Contenedor de productos */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#f9f9f9",
          margin: "0 auto",
        }}
      >
        {loading ? (
          <Spin size="large" style={{ display: "block", textAlign: "center", margin: "20px 0" }} />
        ) : error ? (
          <Alert message={error} type="error" showIcon />
        ) : (
          <ProductList products={products} onAddToCart={addToCart} />
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
