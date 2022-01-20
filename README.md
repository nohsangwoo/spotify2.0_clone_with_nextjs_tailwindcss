## nextjs-examples

create-next-app -e samplename

## heroicons(tailwindcss icons)

- ref: https://heroicons.com/

## next auth

로그인 인증을 위한 basic code form

- login 과 logout기능을 관리해준다(세션에 토큰저장하는 방식으로 처리)

- ref: https://next-auth.js.org/

## spotify web api noe

- ref: https://github.com/thelinmichael/spotify-web-api-node

```
$ npm install spotify-web-api-node
```

- spotify developer에서 api를 생성후 edit settings
  Redirect URIs에 아래 도메인을 추가해준다(화이트리스트에 추가해주는 내용)
  http://localhost:3000/api/auth/callback/spotify
  http://localhost:3000

## recoil

global state managing tool

- ref: https://recoiljs.org/ko/
  npm install recoil

## issue1

token이 만료됐을때 로그아웃처리 및 세션초기화가 안됨 (에러핸들링 해야함)

\_app에서 context 관련내용으로 해결

## tailwindcss-hide-bar

- tailwindcss scrollbar hide 모듈을 설치해서
  className="scrollbar-hide"로 적용하면 작동함

- ref: https://www.npmjs.com/package/tailwind-scrollbar-hide

## 글자의 길이가 너무 길때 생략해주는 tailwindcss
- truncate