# 식스샵 프론트개발자 채용 과제

### 디버그 일지

1. 첨부파일 다운 후 `num run dev`로 실행 시키려고 하니 Package subpath './lib' is not defined by "exports" 에러가 뜨면서 실행이 되지 않았다. <br>
   서칭 중 https://github.com/mswjs/headers-polyfill/issues 이 페이지에서 문제점을 파악 할 수 있었다. <br>
   얼마전 업데이트 된 headers-polyfill `3.1.2` 버전에서 나오는 에러였다. <br>
   `3.0.10` 버전으로 다운그레이드 하면 문제가 없다는 답글의 도움을 받아 다운그레이드 후 에러가 사라진 것을 확인하였다..😥 <br>
   이 문제를 가지고 시간을 많이 날려서 마음이 초조해졌다..

2. 로그인 성공 시 response의 사용자 정보로 현재 header 부분에 표시해주고 있는데, Redux에 사용자 정보를 저장하면 새로고침 시 초기화가 된다. 그래서 사용자 정보를 Local storage 에 저장하였다. Redux-persist 라는 라이브러리가 Redux의 초기화 방지로 쓰이는데 현재는 localstorage.setItem()으로 저장을 하고 있지만 추 후에 라이브러리를 사용하는 방향으로 리팩토링 할 수 있도록 해보아야겠다.

3. 로그인 여부를 확인하여 상품 리스트 페이지 접근을 막아주었다. <br>
   현재 더미데이터 상태이기 때문에 로그인 성공 후 응답 받는 token이 고정값이다. <br>
   그래서 이미 알고 있는 token값을 가지고 비교하기에는 의미가 없다고 판단하였다. <br> <br>

- access 토큰이 존재하는지
- 토큰 디코더 후 얻은 id 값과 현재 로그인 되어 있는 회원 id 값이 일치하는지
  <br> <br>
  로그인 상태를 access 토큰 존재 여부로만 판단하기에는 사용자가 조작하기 쉽다. <br>
  그래서 토큰을 디코더하여 조건을 추가해주었다. <br><br>
  위 조건을 전부 만족하면 모든 페이지 접근이 가능하도록 하였고, 아니면 로그인 페이지로 리다이렉션 시켜주었다.
