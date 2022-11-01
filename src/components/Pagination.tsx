import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWantedList } from '../redux/actions/productActions';
import usePagination from '../hooks/usePagination';

const Pagination = () => {
  const dispatch = useDispatch();
  const { totalCount } = useSelector((state) => state.product);
  const router = useRouter();
  const {
    query: { page },
  } = router;

  let total_page = totalCount;
  let wherePage = page;
  let pageGroup = Math.ceil(wherePage / 5);
  let totalPageGroup = Math.ceil(total_page / 10);

  let last, first;

  if (total_page < 5) {
    last = total_page;
    first = 1;
  } else if (pageGroup * 50 > total_page) {
    last = totalPageGroup;
    first = totalPageGroup - Math.floor(totalPageGroup % 10) + 1;
  } else {
    last = pageGroup * 5;
    first = last - 4;
  }

  function pageBtnRender() {
    let pageNum = [];
    for (let i = first; i <= last; i++) {
      pageNum.push(
        <Page
          selected={Number(wherePage) === i}
          key={i}
          onClick={(e) => {
            router.push(`/pagination?page=${i}`);
            dispatch(getAllWantedList(i));
          }}
        >
          {i}
        </Page>
      );
    }
    return pageNum;
  }

  return (
    <Container>
      <Button
        disabled={pageGroup === 1}
        onClick={(e) => {
          router.push(`/pagination?page=${pageGroup * 5 - 9}`);
          dispatch(getAllWantedList(pageGroup * 5 - 9));
        }}
      >
        <VscChevronLeft />
      </Button>
      <PageWrapper>{pageBtnRender()}</PageWrapper>
      <Button
        disabled={pageGroup * 50 > total_page}
        onClick={(e) => {
          router.push(`/pagination?page=${pageGroup * 5 + 1}`);
          dispatch(getAllWantedList(pageGroup * 5 + 1));
        }}
      >
        <VscChevronRight />
      </Button>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 40px;
  margin-left: -20px;
`;

const Button = styled.button`
  &:disabled {
    color: #e2e2ea;
    cursor: default;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  margin: 0 16px;
`;

type PageType = {
  selected: boolean;
};

const Page = styled.button<PageType>`
  padding: 4px 6px;
  background-color: ${({ selected }) => (selected ? '#000' : 'transparent')};
  color: ${({ selected }) => (selected ? '#fff' : '#000')};
  font-size: 20px;

  & + & {
    margin-left: 4px;
  }

  &:disabled {
    cursor: default;
  }
`;
