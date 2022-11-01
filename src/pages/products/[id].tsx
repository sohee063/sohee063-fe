import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { getProductDetail } from '../../redux/actions/productActions';

const ProductDetailPage: NextPage = () => {
  const dispatch = useDispatch();
  const { productDetail, err } = useSelector((state) => state.product);
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const inputPriceFormat = (str) => {
    const comma = (str) => {
      str = String(str);
      return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    };
    return comma(str);
  };

  useEffect(() => {
    if (id) dispatch(getProductDetail(id));
  }, [id]);

  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Container>
        {err ? (
          <ErrPageMsg>존재하지 않는 페이지입니다.</ErrPageMsg>
        ) : (
          <>
            <Thumbnail
              src={productDetail.thumbnail ? productDetail.thumbnail : '/defaultThumbnail.jpg'}
            />
            <ProductInfoWrapper>
              <Name>{productDetail.name}</Name>
              <Price>{inputPriceFormat(productDetail.price)}원</Price>
            </ProductInfoWrapper>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductDetailPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 420px;
`;

const ProductInfoWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.div`
  font-size: 18px;
  margin-top: 8px;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrPageMsg = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
