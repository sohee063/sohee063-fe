import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

const HomePage: NextPage = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
    sessionStorage.removeItem('scroll');
  }, []);

  return (
    domLoaded && (
      <>
        <Header />
        <Container>
          <Link href='/pagination?page=1'>
            <StyledLink>pagination</StyledLink>
          </Link>
          <Link href='/infinite-scroll'>
            <StyledLink>infinite scroll</StyledLink>
          </Link>
        </Container>
      </>
    )
  );
};

export default HomePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  border: 1px solid #222;
  color: #fff;
  font-size: 24px;
  margin-top: 40px;
  cursor: pointer;

  :hover {
    color: #222;
    background-color: transparent;
    border: 1px solid #222;
  }

  & + & {
    margin-top: 40px;
  }
`;
