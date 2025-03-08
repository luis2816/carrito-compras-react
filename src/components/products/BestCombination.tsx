import React, { useState } from "react";
import { Button, Typography, InputNumber, Modal } from "antd";
import { findBestCombination } from "../utils/findBestCombination";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface BestCombinationProps {
    products: Product[];
    onBestCombination: (filteredProducts: Product[]) => void;
}

const BestCombination: React.FC<BestCombinationProps> = ({ products, onBestCombination }) => {
    const [budget, setBudget] = useState<number>(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bestCombo, setBestCombo] = useState<Product[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const handleCalculate = () => {
        const combo = findBestCombination(products, budget);
        setBestCombo(combo);
        setTotalPrice(combo.reduce((sum, product) => sum + product.price, 0));
    };

    const handleClose = () => {
        setBudget(0); // 🔹 Limpia el presupuesto
        setBestCombo([]); // 🔹 Resetea los resultados
        setTotalPrice(0); // 🔹 Reinicia el total
        setIsModalVisible(false);
    };

    return (
        <>
            {/* 🔘 Botón para abrir el modal */}
            <Button
                type="primary"
                style={{
                    backgroundColor: "rgba(106, 100, 100, 0.85)",
                    borderColor: "rgba(106, 100, 100, 0.85)",
                    borderRadius: "50px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    height: "42px",
                    minWidth: "120px",
                }}
                onClick={() => setIsModalVisible(true)}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F58382")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#807B7B")}
            >
                <SearchOutlined />
                Filtrar
            </Button>

            {/* 📌 Modal para ingresar el presupuesto */}
            <Modal
                title={<Title level={4} style={{ color: "#0B0B0B", textAlign: "center" }}>Mejor Combinación de Productos</Title>}
                open={isModalVisible}
                footer={null}
                maskClosable={false} // 🔹 No permite cerrar haciendo clic fuera del modal
                keyboard={false} // 🔹 No permite cerrar con "Esc"
                onCancel={handleClose} // 🔹 Cierra la modal y limpia los datos
            >

                <Text type="secondary" style={{ textAlign: "center", display: "block", marginBottom: "10px" }}>
                    Ingrese su presupuesto y encuentre la mejor selección de productos.
                </Text>

                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <InputNumber
                        min={1}
                        value={budget}
                        onChange={(value) => setBudget(value || 0)}
                        style={{ width: "60%", borderRadius: "5px", borderColor: "#ddd", padding: "8px" }}
                        placeholder="Ingrese el presupuesto"
                    />
                </div>

                <Button
                    type="primary"
                    onClick={handleCalculate}
                    block
                    style={{
                        marginTop: "10px",
                        backgroundColor: "#807B7B",
                        borderRadius: "50px",
                        border: "none",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F58382")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#807B7B")}
                >
                    Calcular
                </Button>

                {bestCombo.length > 0 && (
                    <div style={{ marginTop: "20px", padding: "15px", borderRadius: "5px", background: "#F5F5F5" }}>
                        <Title level={5} style={{ textAlign: "center", color: "#0B0B0B" }}>Resultados</Title>
                        <Text strong>{bestCombo.length} productos encontrados</Text> <br />
                        <Text style={{ color: "#F49897", fontSize: '30px' }}>Monto total: ${totalPrice.toFixed(2)}</Text>

                        <Button
                            type="primary"
                            onClick={() => {
                                onBestCombination(bestCombo);
                                handleClose(); // 🔹 Cierra y limpia la modal
                            }}
                            block
                            style={{
                                marginTop: "10px",
                                backgroundColor: "#807B7B",
                                borderRadius: "50px",
                                border: "none",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F58382")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#807B7B")}
                        >
                            Aceptar y Aplicar
                        </Button>
                    </div>
                )}
            </Modal>
        </>
    );
};

export default BestCombination;
