import { useRouter } from 'next/router';
import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getAllProductList } from '../redux/actions/productActions';
import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

const PaginationPage: NextPage = () => {
  const dispatch = useDispatch();
  const { allProductList, totalCount } = useSelector((state) => state.product);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    if (page) {
      dispatch(getAllProductList(Number(page)));
    }
  }, [page]);

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
        {page > Math.ceil(totalCount / 5) ? (
          <ErrPageMsg>존재하지 않는 페이지입니다.</ErrPageMsg>
        ) : (
          <>
            <ProductList products={allProductList} />
            <Pagination />
          </>
        )}
      </Container>
    </>
  );
};

export default PaginationPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const ErrPageMsg = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
