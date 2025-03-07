import React from "react";
import { Row, Col } from "antd";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number; // Asegurar que siempre sea un número
}

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void; // Debe coincidir con ShoppingCart
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <Row
      gutter={[16, 16]} // Espaciado uniforme
      justify="center"
      align="top" // Asegura alineación uniforme
      wrap // Permite que los productos se distribuyan correctamente
      style={{ marginTop: 20, padding: "0 10px" }} // Espaciado general
    >
      {products.map((product) => (
        <Col
          key={product.id}
          xs={24} // 1 tarjeta por fila en pantallas pequeñas
          sm={12} // 2 tarjetas por fila en tablets
          md={8}  // 3 tarjetas por fila en pantallas medianas
          lg={6}  // 4 tarjetas por fila en pantallas grandes
          xl={6}  // 5 tarjetas por fila en pantallas extra grandes
          style={{ display: "flex", justifyContent: "center" }}
        >
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
