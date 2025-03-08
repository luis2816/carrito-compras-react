import React from "react";
import { Drawer, List, Typography, Button, Row, Col } from "antd";
import CartItem from "./CartItem";

/** Representa un producto en el carrito de compras. */
interface CartItemType {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

/** Propiedades del componente CartDrawer. */
interface CartDrawerProps {
    /** Lista de productos en el carrito.*/
    cart: CartItemType[];

    /** Estado de visibilidad del Drawer.*/
    visible: boolean;

    /** Función para cerrar el Drawer.*/
    onClose: () => void;

    /** Función para actualizar la cantidad de un producto en el carrito. */
    onUpdateQuantity: (productId: number, amount: number) => void;
}

/** CartDrawer - Componente que muestra el carrito de compras en un Drawer lateral.*/
const CartDrawer: React.FC<CartDrawerProps> = ({ cart = [], visible, onClose, onUpdateQuantity }) => {
    
    // 🔹 Calcula el total de la compra
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Drawer title="Carrito de Compras" placement="right" onClose={onClose} open={visible}>
            {/* Lista de productos en el carrito */}
            <List
                dataSource={cart}
                renderItem={(item) => (
                    <CartItem item={item} onUpdateQuantity={onUpdateQuantity} />
                )}
            />
            
            {/* Footer con Total y Botón de Pago */}
            <div style={{ padding: 16, background: "#fff", borderTop: "1px solid #ddd" }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Typography.Text type="secondary" strong>Total</Typography.Text>
                        <Typography.Title level={3} style={{ margin: 0 }}>
                            ${total.toFixed(2)}
                        </Typography.Title>
                    </Col>
                    <Col>
                        <Button 
                            type="primary" 
                            danger 
                            size="large" 
                            style={{ borderRadius: 20 }}
                        >
                            Comprar
                        </Button>
                    </Col>
                </Row>
            </div>
        </Drawer>
    );
};

export default CartDrawer;
