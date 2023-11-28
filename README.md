# balaan-vue : kimminseol

## Project setup
```
npm install
npm run serve
```

## use library
1. vue3
2. vue-router 
    - 단계별 페이지 이동을 위해 라우터 라이브러리를 사용했습니다.
3. localStorage
    - 단계별 정보를 저장하기 위해 localStorage를 사용하였습니다.
    - vuex나 pinia 같은 상태 관리를 사용할까 생각했었는데, 간단하게 구현하기 위해 localStorage를 사용하였습니다.
    - 또한 모든 정보는 하나의 객체안에 저장하는 방법도 있습니다만, 마지막 페이지에서 필요한 정보만을 빼오기 위해 각각의 정보를 저장했습니다.
    - 단계별이 아닌 하나의 폼으로 구현되어 있다면 폼 자체 데이터를 저장할거 같습니다.
    - 카드정보는 저장하지 않았습니다.
4. daumpost
    - 도로명 주소를 선택했을 경우와 지번 주소를 선택했을 경우를 선택하여 분기처리를 했습니다.
    - 기본주소와 상세주소를 받아 올 수 있도록 하였습니다.




