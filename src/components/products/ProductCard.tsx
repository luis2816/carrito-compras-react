import React from "react";
import { Card, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
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

      {/* Botón en la esquina inferior derecha */}
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
