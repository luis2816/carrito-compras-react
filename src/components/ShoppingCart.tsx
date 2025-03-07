import React, { useState } from "react";
import { Typography } from "antd";
import CartButton from "./cart/CartButton";
import CartDrawer from "./cart/CartDrawer";
import ProductList from "./products/ProductList";

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number; // 🔥 Asegurar que siempre sea un número
  }

  const products: Product[] = [
    { id: 1, name: "Producto 1", price: 100, image: "https://via.placeholder.com/100", quantity: 0 },
    { id: 2, name: "Producto 2", price: 150, image: "https://via.placeholder.com/100", quantity: 0 },
    { id: 3, name: "Producto 3", price: 200, image: "https://via.placeholder.com/100", quantity: 0 },
    { id: 4, name: "Producto 4", price: 250, image: "https://via.placeholder.com/100", quantity: 0 },
    { id: 5, name: "Producto 5", price: 300, image: "https://via.placeholder.com/100", quantity: 0 },
    { id: 6, name: "Producto 6", price: 350, image: "https://via.placeholder.com/100", quantity: 0 },
    { id: 7, name: "Producto 7", price: 400, image: "https://via.placeholder.com/100", quantity: 0 },
    { id: 8, name: "Producto 8", price: 450, image: "https://via.placeholder.com/100", quantity: 0 },
  ];
  
const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }]; // 🔹 Garantiza que siempre tenga cantidad
    });
  };

  const updateQuantity = (productId: number, amount: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0); // Elimina el producto si la cantidad llega a 0
    });
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
        <ProductList products={products} onAddToCart={addToCart} />
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
