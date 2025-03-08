import React from "react";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

/** Representa un producto disponible para la compra.*/
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

/**  Propiedades del componente ProductCard. */
interface ProductCardProps {
  /**  Información del producto a mostrar. */
  product: Product;

  /** Función para agregar el producto al carrito.*/
  onAddToCart: (product: Product) => void;
}

/** ProductCard - Componente que muestra la información de un producto en una tarjeta interactiva. */
const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // URL de imagen generada aleatoriamente (placeholder)
  const imageUrl = `https://picsum.photos/200/250?random=${product.id}`;

  return (
    <Card
      hoverable
      className="product-card" // Se aplica la clase CSS
      cover={
        <img
          src={imageUrl}
          alt={product.name}
          style={{
            padding: "10px",
            height: "200px",
            width: "90%",
            borderRadius: "20px",
          }}
        />
      }
    >
      {/* Información del producto */}
      <Card.Meta
        title={
          <span style={{ color: "#f47170", fontSize: "14px", fontWeight: "bold" }}>
            {product.name}
          </span>
        }
        description={
          <span style={{ fontSize: "16px", fontWeight: "bold" }}>
            ${product.price.toFixed(2)}
          </span>
        }
      />

      {/*Botón para agregar al carrito */}
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        className="add-to-cart-button"
        onClick={() => onAddToCart(product)}
      />
    </Card>
  );
};

export default ProductCard;
