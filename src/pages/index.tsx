import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { logoutActions } from '../redux/actions/loginActions';
import { useSelector, useDispatch } from 'react-redux';

const HomePage: NextPage = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  const dispatch = useDispatch();
  const isLogin = Cookies.get('access');
  let userName;

  if (typeof window !== 'undefined') {
    userName = localStorage.getItem('userName');
  }

  const logout = () => {
    dispatch(logoutActions());
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <>
          <Header>
            <Link href='/'>
              <Title>HAUS</Title>
            </Link>

            {isLogin ? (
              <div>
                <p>{userName}</p>
                <p onClick={logout}>logout</p>
              </div>
            ) : (
              <Link href='/login'>
                <p>login</p>
              </Link>
            )}
          </Header>
          <Container>
            <Link href='/pagination?page=1'>
              <StyledLink>pagination</StyledLink>
            </Link>
            <Link href='/infinite-scroll'>
              <StyledLink>infinite scroll</StyledLink>
            </Link>
          </Container>
        </>
      )}
    </>
  );
};

export default HomePage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  div {
    text-align: end;
  }

  p {
    cursor: pointer;

    :hover {
      color: silver;
    }
  }
`;

const Title = styled.a`
  font-size: 48px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 40px;
`;

const StyledLink = styled.a`
  display: flex;
  justify-content: center;
  width: 240px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;
  font-size: 24px;

  & + & {
    margin-top: 40px;
  }
`;
