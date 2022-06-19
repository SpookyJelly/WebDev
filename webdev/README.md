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

이렇게 나온 코드를 index.html에 로딩하면 브라우저 무관하게 사용할 수 있다.

- --config 옵션

config 옵션은 웹팩 설정파일의 경로를 지정할 수 있는데, 기본 파일명이 `webpack.config.js` 혹은 `webpackfile.js`이다.

webpackfile.js를 직접 만들어 터미널 스크립트를 코드로 만들어보자. --> 완료

이제 `node_modules/.bin/webpack`을 실행시키면 wepackfile.js를 자동으로 서칭해서 그 내용을 실행시켜준다.

이제 npm script로 build를 치면 node_modules~ 가 실행되도록하자

### 로더

웹팩은 모든 파일을 모듈로 바라본다. (js, css, image, font...)

그렇기 때문에 import 구문을 사용하면 자바스클비트 코드 안으로 가져올 수 있다 (헉!)

그리고 이것이 가능한 이유는 웹팩의 "로더" 덕분이다. 로더는 TS 같은 언어를 다른 JS로 변환해주거나, 이미지를 data URL 형식의 문자열로 변환한다. 뿐만 아니라, CSS를 직접 JS에서 로딩할 수 있게 해준다.

-> 나만의 모듈을 myloader.js라는 이름으로 만들고, 각 모듈이 올때마다 console.log를 찍게 하자.

-> 완료

-> npm run build로 빌드 커맨드를 실행할때 마다 (webpack 이 동작할때마다) "my loader works!" 라는 문구가 뜨는걸 확인할 수 있다.
