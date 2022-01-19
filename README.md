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
