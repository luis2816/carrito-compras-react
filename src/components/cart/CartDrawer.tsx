import React from "react";
import { Drawer, List, Typography, Button, Row, Col } from "antd";
import CartItem from "./CartItem";

interface CartDrawerProps {
    cart: {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
    }[];
    visible: boolean;
    onClose: () => void;
    onUpdateQuantity: (productId: number, amount: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ cart, visible, onClose, onUpdateQuantity }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <Drawer title="Carrito de Compras" placement="right" onClose={onClose} open={visible}>
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
                        <Typography.Title level={3} style={{ margin: 0 }}>${total.toFixed(2)}</Typography.Title>
                    </Col>
                    <Col>
                        <Button type="primary" danger size="large" style={{ borderRadius: 20 }}>Payment</Button>
                    </Col>
                </Row>
            </div>
        </Drawer>
    );
};

export default CartDrawer;
