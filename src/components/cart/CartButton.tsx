import React from "react";
import { Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Badge count={itemCount}>
        <Button type="primary" icon={<ShoppingCartOutlined />} size="large" onClick={onClick}>
          Ver Carrito
        </Button>
      </Badge>
    </div>
  );
};

export default CartButton;
