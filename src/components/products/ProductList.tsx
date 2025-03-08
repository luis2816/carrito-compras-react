import React from "react";
import { Row, Col, Alert } from "antd";
import ProductCard from "./ProductCard";

/** Representa un producto disponible en la lista. */
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

/** Propiedades del componente ProductList. */
interface ProductListProps {
  /** Lista de productos disponibles. */
  products: Product[];

  /**  Función para agregar un producto al carrito.*/
  onAddToCart: (product: Product) => void;
}

/** ProductList - Componente que muestra una lista de productos en una cuadrícula.*/
const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div style={{ marginTop: 20, padding: "0 10px" }}>
      {products.length === 0 ? (
        // Muestra un mensaje si no hay productos disponibles
        <Alert
          message="No hay productos disponibles"
          description="Por favor, revisa más tarde o contacta al administrador."
          type="warning"
          showIcon
          style={{ textAlign: "center", marginBottom: 20 }}
        />
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {products.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ProductList;
