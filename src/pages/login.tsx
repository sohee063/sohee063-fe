import Link from 'next/link';
import type { NextPage } from 'next';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import TextInput from '../components/TextInput';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from '../redux/actions/loginActions';

// 초기값은 에러없음. ( && 연산자로 묶는다. )
// focus out 될 때 + 유효하지 않은 값일 때 에러메세지 보여주고 배경색 바뀌고
// 유효한 값 일 때는 무조건 에러메세지가 사라지고 배경색도 바뀐다.

const LoginPage: NextPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idErrMsg, setIdErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');

  // const [loginValid, setLoginValid] = useState(false);
  // const [isIdValidInput, setIsIdValidInput] = useState(true);
  // const [isPasswordValidInput, setIsPasswordValidInput] = useState(true);

  let isIdValidInput = (/^[a-zA-Z0-9\`~!@#$%^&*()-_=+]{5,30}$/.test(id) ^ (id.length > 0)) == 0;
  let isPasswordValidInput =
    (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,30}$/.test(password) ^
      (password.length > 0)) ==
    0;

  // let isIdValid = /^[a-zA-Z0-9\`~!@#$%^&*()-_=+]{5,30}$/;
  // let isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,30}$/;

  let loginValid = isIdValidInput && id.length > 0 && isPasswordValidInput && password.length > 0;

  // let isIdValidInput, isPasswordValidInput;

  const loginIdRequestHandler = () => {
    !isIdValidInput ? setIdErrMsg('올바른 아이디 형식으로 입력해주세요.') : setIdErrMsg('');
  };

  const loginPasswordRequestHandler = () => {
    !isPasswordValidInput
      ? setPasswordErrMsg('올바른 비밀번호 형식으로 입력해주세요.')
      : setPasswordErrMsg('');
  };

  const handlerOnblur = () => {
    //   // if (!isIdValidInput || !isPasswordValidInput) {
    //   loginIdRequestHandler();
    //   loginPasswordRequestHandler();
    //   // }
    //   isIdValidInput = (isIdValid.test(id) ^ (id.length > 0)) == 0;
    //   isPasswordValidInput = (isPasswordValid.test(password) ^ (password.length > 0)) == 0;
  };

  // console.log(loginValid);

  // useEffect(() => {
  //   handlerOnblur();
  // }, [id, password, isIdValidInput, isPasswordValidInput]);

  /// redux

  let dispatch = useDispatch();

  const loginRequest = () => {
    dispatch(loginActions(id, password));

    console.log('네임', userName);
  };

  ///

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
