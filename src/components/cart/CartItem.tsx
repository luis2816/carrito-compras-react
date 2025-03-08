import React from "react";
import { List, Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

/**  Representa un producto en el carrito de compras. */
interface CartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

/** Propiedades del componente CartItem.*/
interface CartItemProps {
  /** Información del producto en el carrito.*/
  item: CartItemType;

  /**  Función para actualizar la cantidad del producto.*/
  onUpdateQuantity: (productId: number, amount: number) => void;
}

/** CartItem - Componente que representa un producto dentro del carrito.*/
const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity }) => {

  // URL de imagen generada aleatoriamente (placeholder)
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
      {/* Información del producto */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={imageUrl} alt={item.name} style={{ width: 60, height: 60, borderRadius: 8, marginRight: 10 }} />
        <div>
          <div style={{ fontWeight: "bold" }}>{item.name}</div>
          <div style={{ color: "#666" }}>${item.price.toFixed(2)}</div>
        </div>
      </div>

      {/* Controles de cantidad */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button 
          type="text" 
          icon={<MinusOutlined />} 
          onClick={() => onUpdateQuantity(item.id, -1)} 
          disabled={item.quantity === 1} // Evita reducir la cantidad a menos de 1
        />
        <span style={{ margin: "0 10px", fontWeight: "bold" }}>{item.quantity}</span>
        <Button 
          type="text" 
          icon={<PlusOutlined />} 
          onClick={() => onUpdateQuantity(item.id, 1)} 
        />
      </div>
    </List.Item>
  );
};

export default CartItem;
