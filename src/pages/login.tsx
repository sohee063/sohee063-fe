import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from '../components/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../redux/actions/loginActions';

const LoginPage: NextPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idErrMsg, setIdErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');

  let dispatch = useDispatch();

  let isIdValidInput = (/^[a-zA-Z0-9\`~!@#$%^&*()-_=+]{5,30}$/.test(id) ^ (id.length > 0)) == 0;
  let isPasswordValidInput =
    (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,30}$/.test(password) ^
      (password.length > 0)) ==
    0;
  let loginValid = isIdValidInput && id.length > 0 && isPasswordValidInput && password.length > 0;

  const loginIdRequestHandler = () => {
    !isIdValidInput ? setIdErrMsg('올바른 아이디 형식으로 입력해주세요.') : setIdErrMsg('');
  };
  const loginPasswordRequestHandler = () => {
    !isPasswordValidInput
      ? setPasswordErrMsg('올바른 비밀번호 형식으로 입력해주세요.')
      : setPasswordErrMsg('');
  };

  const handlerOnblur = () => {
    loginIdRequestHandler();
    loginPasswordRequestHandler();
  };

  const loginRequest = () => {
    dispatch(loginActions(id, password));
  };

  useEffect(() => {
    isIdValidInput && setIdErrMsg('');
    isPasswordValidInput && setPasswordErrMsg('');
  }, [id, password]);

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
      <Form>
        <div>아이디</div>
        <div>
          <TextInput
            type='text'
            value={id || ''}
            handlerValueState={(e) => setId(e.target.value)}
            err={!isIdValidInput}
            handlerOnblur={handlerOnblur}
          />
        </div>
        <p className='err'>{idErrMsg}</p>
        <div>비밀번호</div>
        <div>
          <TextInput
            type='password'
            value={password || ''}
            handlerValueState={(e) => setPassword(e.target.value)}
            err={!isPasswordValidInput}
            handlerOnblur={handlerOnblur}
          />
        </div>
        <p className='err'>{passwordErrMsg}</p>
        <LoginButton disabled={!loginValid} onClick={() => loginRequest()}>
          로그인
        </LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;

  > div:first-child {
    font-weight: 700;
    font-size: 13px;
    color: #6c6c7d;
  }

  > p {
    margin-top: 8px;
    font-weight: 400;
    font-size: 13px;
    color: #ed4e5c;
  }
`;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
