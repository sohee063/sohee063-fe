import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

import Header from '../components/Header';
import ProductList from '../components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getScrollProductList } from '../redux/actions/productActions';
import Loading from '../components/Loading';

const InfiniteScrollPage: NextPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { scrollProductList, totalCount, loading } = useSelector((state) => state.product);

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const fakeFetch = (delay = 300) => new Promise((res) => setTimeout(res, delay));

  const fetchMoreData = async () => {
    setPage(page + 1);
    await fakeFetch();
    if (scrollProductList.length < totalCount) {
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
    if (page === 1) {
      let savePage = sessionStorage.getItem('page');
      setPage(Number(savePage));
    }
  }, [page]);

  useEffect(() => {
    if (scrollProductList.length < 1) {
      dispatch(getScrollProductList(1));
    }
    sessionStorage.setItem('page', 1);
  }, []);

  /* 스크롤 위치 기억하기 */
  const [position, setPosition] = useState(0);
  function onScroll() {
    setPosition(Math.round(window.scrollY));
  }

  useEffect(() => {
    const scroll = parseInt(sessionStorage.getItem('scroll'), 0);
    window.scrollTo(0, scroll);

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  /*                */

  console.log(page);

  return (
    <>
      <Header />
      <Container>
        <ProductList products={scrollProductList} scrollPosition={position} page={page} />
      </Container>
      {/* <Loader></Loader> */}
      <Scroll ref={ref}>{loading && <Loading />}</Scroll>
    </>
  );
};

export default InfiniteScrollPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
  margin-top: 40px;
`;

const Scroll = styled.div`
  height: 100px;
  margin: 50px;
`;
