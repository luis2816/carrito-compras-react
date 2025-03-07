import React from "react";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; // Asegurar que siempre sea un número
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const imageUrl = `https://picsum.photos/200/250?random=${product.id}`;

  return (
    <Card
      hoverable
      style={{ width: 500, borderRadius: 12, border: "2px solid #42A5F5", position: "relative" }}
      cover={<img src={imageUrl} alt={product.name} style={{ padding: "10px", height: "200px", width: '90%', borderRadius:'20px'}} />}
    >
      <Card.Meta 
        title={<span style={{ color: "#f47170", fontSize: "14px", fontWeight: "bold" }}>{product.name}</span>} 
        description={<span style={{ fontSize: "16px", fontWeight: "bold" }}>${product.price.toFixed(2)}</span>}
      />

      {/* Botón en la esquina inferior derecha */}
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<PlusOutlined />}
        style={{
          backgroundColor: "#F47170",
          border: "none",
          position: "absolute",
          bottom: "10px",
          right: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
        onClick={() => onAddToCart(product)}
      />
    </Card>
  );
};

export default ProductCard;
