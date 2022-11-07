import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Product } from '../types/product';
import { useSelector } from 'react-redux';

type ProductItemProps = {
  product: Product;
};

const inputPriceFormat = (str) => {
  const comma = (str) => {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  };
  return comma(str);
};

const ProductItem = ({
  product: { name, thumbnail, price, id },
  scrollPosition,
  page,
}: ProductItemProps) => {
  const router = useRouter();
  return (
    <Container>
      <Thumbnail
        src={thumbnail ? thumbnail : '/defaultThumbnail.jpg'}
        onClick={(e) => {
          router.push(`/products/${id}`);
          sessionStorage.setItem('scroll', scrollPosition);
          sessionStorage.setItem('page', page);
        }}
      />
      <Name>{name}</Name>
      <Price>{inputPriceFormat(price)}</Price>
    </Container>
  );
};

export default ProductItem;

const Container = styled.a`
  width: 180px;
  margin-left: 20px;
  margin-top: 20px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
  cursor: pointer;
`;

const Name = styled.div`
  margin-top: 8px;
  font-size: 16px;
`;

const Price = styled.div`
  margin-top: 4px;
`;
