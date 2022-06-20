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

- css-loader

css-loader는 css를 JS로 변환시켜주는 로더이다.
npm으로 다운이 가능하다

실제 css-loader를 추가한 후, test에 regx .css$를, rules에 use:["css-loader"] 를 사용하는 것으로 .css 파일을 css-loader로 처리하도록 할 수 있다.

-> webpack.config.js 수정

---> 하고 빌드하면 css 코드가 JS로 변환된것을 확인할 수 있다.
-> ./dist/main.js 확인

```javascript

...CSS_LOADER_EXPORT___.push([module.id, \"body {\\n  background-color: rgba(145, 124, 232, 0.9);\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack:///./style.css?");


```

- style-loader

하지만 놀랍게도 모듈로 변경된 스타일 시트는 DOM에 추가해야지만 브라우저가 해석할 수 있다. 앞서 한 css-loader는 css가 자바스크립트로 변경만 되었을 뿐, DOM에 적용 된 것이 아니기에, 빌드하여도 스타일이 적용되지 않았음을 확인할 수 있다.

style-loader는 JS로 변환된 스타일을 동적으로 돔에 추가하는 로더이다. 따라서, CSS를 번들링하기 위해서는 css-loader와 style-loader를 함께 사용해야한다.

마찬가지로 다운하고 웹팩 설정으로 적용해주자.

-> style-loader도 css 파일에 적용해야한다.
-> use:[]에 배열로 설정한다면, 뒤에서부터 앞으로 로더가 동작한다.

`use:["style-loader", "css-loader"]`로 되어있는 코드는 먼저 css파일에 css-loader를 적용한 뒤, style-loader를 적용하게 된다.

-> 만약 순서를 반대로 하면 스타일이 안들어간다. (어찌보면 당연? css가 js로 변환되고, 그 다음에 변경된 스타일을 불러야하니까.)

--> npm으로 install한 loader들은은 webpack.config.js에서 import 혹은 require할 필요가 없다.

- file-loader

css뿐만 아니라 소스코드에서 사용하는 모든 파일을 모듈로 사용 가능하다.

file-loader는 파일을 모듈형태로 지원 하고 웹팩 아웃풋에 파일을 옮겨준다. css에서 url()함수를 이용하여 이미지 파일 경로를 지정할 수 있는데, 웹팩은 file-loader를 이용해서 이 파일을 처리한다.

-> css를 아래와 같이 추가

```css
body div {
  background-image: url(bg.png);
}
```

그리고 webpack.config.js에 module rule array의 elem으로 추가하면 된다. 여기서 주의할 것이, 만약 rule을 여러개 써버린다면, 가장 나중에 쓴 rule이 적용된다.

-> 이후 빌드를 돌리면 dist에 이름이 hash로 변경되서 처리된다.
(캐쉬 갱신을 위한 처리로 판단)

아무튼, 이대로 로드하면 background-image:url(bg.png) 코드에 의해 동일 폴더에서 이미지를 찾으려고 시도하는데, 웹팩으로 빌드한 이미지는 output인 dist로 빠졌기 때문에, 이미지 로딩이 안된다.

그렇기 때문에 module options으로 경로를 바로 잡아줘야한다.

```javascript

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.png$/,
        loader: "file-loader",
        options: {
          publicPath: "./dist", // prefix를 아웃풋 경로로 설정
          name: "[name].[ext]?[hash]", // 파일명 형식
        },
      },
    ],
  },


```

---

webpack5로 넘어오면서 raw-loader, url-loader, file-loader가 기본사양이 되었다.

type: "asset/resoure"를 rule에 기재하는 것으로 file-loader 설정 대체 가능

단, output에 assetModuleFilename 속성을 추가로 설정해줘야한다. <-- css url()함수를 사용할 경우에.

### Webpack5 추가 내용

webpack5로 넘어오면서 각종 loader들이 rules에 type:"asset/XXX" 로 대체되었다고 했는데,

type:"asset" 이라는 놈도 있다.

이 모듈은 기본 조건에 따라서 resource (파일을 아웃풋 경로로 방출하는)와 inline (파일을 BASE64로 변환해서 인라인으로 쓰는) 모드를 선택하는데, 기본적으로 파일의 크기가 8kb 이상이면 resoure 모듈로, 미만이면 inline 모듈로 처리한다. 근데 이를 parser 옵션으로 용량 조건을 변경할 수 있다. (일일이 로더 붙이고 설정하는 것보다 더 편하다)

```javascript

{
  test: /\.png$/,
  type:"asset",
  parser: {
    dataUrlCondition:{
      maxSize:5000
    }
  }
}

```

아무튼 url-loader (inline) 을 쓰면 네트워크 리소스를 사용하는 부담을 줄이고 (resource로 output dist에 저장하면 해당 이미지가 필요할 때마다 서버로 요청을 보내서 불러와야하니까), 성능을 높일 수 있다.

한 페이지에서 작은 이미지를 여럿 사용하게 된다면 inline을 쓰는 것이 좋다.

### 플러그인

로더가 파일 단위로 처리하는 반면, 플러그인은 번들된 결과물을 처리한다. 번들된 JS를 난독화 하거나, 특정 텍스트를 추출하는 용도로 사용되는 것이 플러그 인이다.

- 로더와 달리 플러그인은 클래스로 제작

-> 만들어서 빌드하면, 로그는 한번만 찍힘을 확인할 수 있다. 모듈은 각 파일마다 동작하는 반면, 플러그인은 하나로 번들링 된 결과물을 대상으로 동작한다.

지금 예제에서는 결과물이 main.js 하나이기 때문에 플러그인이 한번만 동작.

### 번들 결과에 접근하는 방법

--> webpack5 에서는 4와 다르게 뭔가 다른 방식으로 소스에 접근하는데, 아직 잘 알수 가 없다. 일단 넘기고, 좀더 디깅해보자.

--> 그리고, 소스에 각주 달고 싶으면 일단은 bannerPlugin 사용하자.
