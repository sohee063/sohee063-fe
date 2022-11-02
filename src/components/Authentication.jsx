import { useRouter } from 'next/router';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const Authentication = ({ children }) => {
  const router = useRouter();
  const currentUrl = router.pathname;
  const notPublicPages = ['pagination', 'infinite-scroll'];
  const pageRootName = currentUrl.slice(1).split('/')[0];
  const isPublicPage = !notPublicPages.includes(pageRootName);

  const access = Cookies.get('access');
  let userId, decoded;

  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userID');
  }

  if (access) {
    decoded = jwt_decode(access);
  }

  // access 토큰이 존재 하는지
  // Jwt 디코더 결과 현재 로그인된 id와 디코더로 얻은 id 값이 일치하는지
  // 회원 목록에 현재 로그인 된 회원이 있는지 -> 아직,,, redux 초기화 문제

  useEffect(() => {
    if (!access && !isPublicPage && decoded?.user?.id !== userId) {
      alert('로그인이 필요합니다.');
      router.push('/login');
    }
  }, [isPublicPage, userId, router]);

  if (!access && !isPublicPage && decoded?.user?.id !== userId) {
    return <div></div>;
  }

  return <>{children}</>;
};

export default Authentication;
