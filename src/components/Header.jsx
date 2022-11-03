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
          <LogoutBtn onClick={logout}>logout</LogoutBtn>
        </div>
      ) : (
        <Link href='/login'>
          <LoginBtn>login</LoginBtn>
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

  p: nth-child(2) {
    cursor: pointer;

    :hover {
      color: silver;
    }
  }
`;

const LoginBtn = styled.button`
  background-color: #6d6bd1;
  border-radius: 8px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  text-align: center;
  transition: all 0.2s;

  :hover,
  focus {
    background-color: #5553c4;
  }
`;

const LogoutBtn = styled(LoginBtn)`
  background-color: transparent;
  color: #222;
  border: 1px solid #e2e2ea;

  :hover,
  focus {
    color: #6d6bd1;
    border: 1px solid #6d6bd1;
    background-color: transparent;
  }
`;

const Title = styled.a`
  font-size: 48px;
  cursor: pointer;
`;
