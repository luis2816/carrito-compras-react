import React from "react";
import { Button, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

/**
 * Propiedades del componente CartButton.
 */
interface CartButtonProps {
  /** Cantidad de elementos en el carrito. */
  itemCount: number;

  /** Función que se ejecuta al hacer clic en el botón del carrito. */
  onClick: () => void;
}

/**
 * CartButton - Componente de botón flotante para acceder al carrito de compras.
 * Muestra un contador con la cantidad de productos agregados.
 */

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
      {/* Badge para mostrar la cantidad de productos en el carrito */}
      <Badge count={itemCount}>
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          size="large"
          onClick={onClick} // 🔹 Ejecuta la función al hacer clic.
        />
      </Badge>
    </div>
  );
};

export default CartButton;
