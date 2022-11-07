import FadeLoader from 'react-spinners/FadeLoader';
import styled from 'styled-components';

const Loading = ({ height }) => {
  console.log('높이', height);
  return (
    <Loader>
      <FadeLoader color='#6d6bd1' size={8} />
    </Loader>
  );
};

export default Loading;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
