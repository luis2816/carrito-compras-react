import React from "react";
import { List, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  onUpdateQuantity: (productId: number, amount: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity }) => {
    const imageUrl = `https://picsum.photos/200/250?random=${item.id}`;

  return (
    <List.Item
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        background: "#fff",
        marginBottom: "10px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={imageUrl}
          alt={item.name}
          style={{ width: 60, height: 60, borderRadius: 8, marginRight: 10 }}
        />
        <div>
          <div style={{ fontWeight: "bold" }}>{item.name}</div>
          <div style={{ color: "#666" }}>${item.price.toFixed(2)}</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          type="text"
          icon={<MinusOutlined />}
          onClick={() => onUpdateQuantity(item.id, -1)}
          disabled={item.quantity === 1}
        />
        <span style={{ margin: "0 10px", fontWeight: "bold" }}>{item.quantity}</span>
        <Button type="text" icon={<PlusOutlined />} onClick={() => onUpdateQuantity(item.id, 1)} />
      </div>
    </List.Item>
  );
};

export default CartItem;
