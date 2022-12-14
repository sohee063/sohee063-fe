import styled from 'styled-components';

import { Product } from '../types/product';
import ProductItem from './ProductItem';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products, scrollPosition, page }: ProductListProps) => {
  return (
    <Container>
      {products.map((product) => (
        <ProductItem
          key={Math.random() * 100}
          product={product}
          scrollPosition={scrollPosition}
          page={page}
        />
      ))}
    </Container>
  );
};

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin-left: -20px;
`;
