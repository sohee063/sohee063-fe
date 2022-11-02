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
import Header from '../components/Header';

const PaginationPage: NextPage = () => {
  const dispatch = useDispatch();
  const { allProductList, totalCount, err } = useSelector((state) => state.product);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    if (page) {
      dispatch(getAllProductList(Number(page)));
    }
  }, [page]);

  return (
    <>
      <Header />
      <Container>
        {err ? (
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
