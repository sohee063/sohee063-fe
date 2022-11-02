import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { logoutActions } from '../redux/actions/loginActions';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode';

const Header = () => {
  const access = Cookies.get('access');
  const dispatch = useDispatch();
  let userName, userId, decoded;

  if (typeof window !== 'undefined') {
    userName = localStorage.getItem('userName');
    userId = localStorage.getItem('userID');
  }

  if (access) {
    decoded = jwt_decode(access);
  }

  const logout = () => {
    dispatch(logoutActions());
  };

  return (
    <HeaderSection>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>
      {access && decoded.user?.id === userId ? (
        <div>
          <p>{userName}</p>
          <p onClick={logout}>logout</p>
        </div>
      ) : (
        <Link href='/login'>
          <p>login</p>
        </Link>
      )}
    </HeaderSection>
  );
};

export default Header;

const HeaderSection = styled.div`
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
