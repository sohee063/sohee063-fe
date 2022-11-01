# 식스샵 프론트개발자 채용 과제

### 디버그 일지

1. 첨부파일 다운 후 `num run dev`로 실행 시키려고 하니 Package subpath './lib' is not defined by "exports" 에러가 뜨면서 실행이 되지 않았다. <br>
   서칭 중 https://github.com/mswjs/headers-polyfill/issues 이 페이지에서 문제점을 파악 할 수 있었다. <br>
   얼마전 업데이트 된 headers-polyfill `3.1.2` 버전에서 나오는 에러였다. <br>
   `3.0.10` 버전으로 다운그레이드 하면 문제가 없다는 답글의 도움을 받아 다운그레이드 후 에러가 사라진 것을 확인하였다..😥 <br>
   이 문제를 가지고 시간을 많이 날려서 마음이 초조해졌다..

