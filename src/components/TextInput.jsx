import styled from 'styled-components';
import { useState } from 'react';

const TextInput = ({ type, value, err, handlerValueState, handlerOnblur, handleKeyPress }) => {
  return (
    <IptFormArea>
      <input
        type={type}
        err={err}
        value={value}
        onChange={handlerValueState}
        onKeyPress={handleKeyPress}
        autoComplete='off'
        onBlur={handlerOnblur}
      ></input>
    </IptFormArea>
  );
};

export default TextInput;

const IptFormArea = styled.div`
  position: relative;

  > input {
    margin-top: 8px;
    padding: 16px;
    background-color: ${(props) => (props.children.props.err ? '#FDEDEE' : '#F7F7FA')};
    border-radius: 12px;
    width: 100%;
  }
`;
