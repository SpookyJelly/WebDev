## 프론트엔드 개발환경의 이해vmfh

## 모듈 등장의 배경

- 한 html에서 여러개의 js 파일{을 실행시키려면 일단 전부 불러온 다음 html에서 읽어야하는데, 만약 서로 다른 js가 같은 이름의 함수/변수를 가질 경우 충돌이 일어난다 (전역 스코프의 오염)

이를 예방하기 위해 함수 스코프를 독자적으로 만들어 사용 (IIFE 방식이라고도 한다.)

```javascript
var math = math || {};
(function () {
  function sum(a, b) {
    return a + b;
  }
  math.sum = sum;
});
```

여기서 모듈을 만드는 방식을 더 확장한 명세가 AMD와 CommonJS이다.

- commonJS = require 문법 사용 (Node.js 플랫폼)
- AMD = 비동기로 로드되는 환경에서 모듈을 사용하는 명세

- UMD = AMD기반으로 CommonJS 방식까지 지원하는 통합 형태

==> 이러다가 끝판왕 ES2015 등장. 흔히 아는 import, export를 사용하는 문법

### 웹팩

- 여러개 파일을 하나의 파일로 합쳐주는 번들러

등장배경 : 아직 모든 브라우저에서 ES2015를 지원하지는 않는다. 그래서 브라우저와 무관하게 모듈을 사용하기 위해. 이를 돕기 위해 등장

하나의 시작점 (엔트리 포인트)에서 의존적인 모듈을 전부 찾아내고, 이를 하나로 뭉친다.

webpack과 webpack-cli을 npm으로 설치한 뒤, node_modules/.bin/webpack --help을 입력하면 사용할 수 있는 스크립트에 대한 설명이 나온다

--mode , --entry , -o (구. output) 만 사용한다면 코드를 묶을 수 있다.

`node_modules/.bin/webpack --mode development --entry ./app.js -o dist/main.js`
