import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

import Header from '../components/Header';
import products from '../api/data/products.json';
import ProductList from '../components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getScrollProductList } from '../redux/actions/productActions';

const InfiniteScrollPage: NextPage = () => {
  const [page, setPage] = useState(1);
  const [fetchData, setFetchData] = useState([]);
  const dispatch = useDispatch();
  const { scrollProductList, totalCount } = useSelector((state) => state.product);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  const fakeFetch = (delay = 300) => new Promise((res) => setTimeout(res, delay));

  const fetchMoreData = async () => {
    setPage(page + 1);
    await fakeFetch();
    if (fetchData.length < totalCount) {
      dispatch(getScrollProductList(page));
    }
  };

  useEffect(() => {
    if (!inView) {
      return;
    }
    fetchMoreData();
  }, [inView]);

  useEffect(() => {
    dispatch(getScrollProductList(1));
  }, []);

  console.log(scrollProductList, page);

  return (
    <>
      <Header />
      <Container>
        <ProductList products={scrollProductList} />
      </Container>
      <Scroll ref={ref}></Scroll>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px 40px;
`;

const Scroll = styled.div`
  height: 200px;
`;
