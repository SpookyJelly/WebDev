### 트랜스파일과 바벨

- 트랜스파일 : ES2015 ++ 로 작성된 코드를 모든 브라우저에서 동작할 수 있도록 코드를 변환해주는 것.

변환 전 후의 추상화 수준이 다른 "빌드" 와는 달리, 트랜스파일은 추상화 수준을 유지한 채로 코드를 변환한다. 따라서, 트랜스파일 후에도 여전히 코드를 읽을 수 있다.

- 이 트랜스파일에 사용하는 도구가 바벨이다

`npm install -D @babel/core @babel/cli`

바벨 코어와 터미널 도구를 사용하기 위해서 커멘드라인 도구도 같이 설치

바벨은 3단계로 빌드 진행

1. 파싱 : 코드를 읽고 추상 구문 트리 (AST)로 변환하는 단계.
2. 변환 : 추상구문 트리를 변경하는 단계
3. 출력 : 변경된 결과물을 출력하는 단계

놀라운 사실 : 바벨은 파싱과 출력만 담담하고 실제 변환작업은 플러그인이 처리한다.

커스텀 플러그인(myplugin.js)를 만들어서 받은 놈들을 꺼꾸로 출력하도록 해보자.

-> 플러그인 형식은 visitor 객체를 가진 함수를 반환 해야한다. 이 객체는 바벨이 파싱하여 만든 추상구문트리에 접근할 수 있는 메소드를 제공한다.

`npx babel ${변환할 파일} --plugins ${플러그인 파일}`

를 사용하면 변환한 파일에 플러그인 파일을 적용하여 파싱, 변환, 출력을 해준다.

여기서 Identifier() 메소드를 정리했는데, 여기서의 인자에 (예제에서는 path)접근하면 코드 조각에 접근이 가능하다.

또한 VariableDeclartion 메서드를 만들어서, 각 코드 조각에 접근한 뒤, const 키워드를 var로 바꿔보자.

```javascript
return {
  visitor: {
    // https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-block-scoping/src/index.js#L26
    VariableDeclaration(path) {
      console.log("VariableDeclaration() kind:", path.node.kind); // const

      if (path.node.kind === "const") {
        path.node.kind = "var";
      }
    },
  },
};
```

출력 결과 `const alert`이 `var alert`으로 변경된것을 확인할 수 있다.

이렇게 const, let 같이 블록 스코핑을 따르는 예약어를 함수 스코핑을 사용하는 var로 변경해주는 플러그인 이 block-scoping 플러그인이다.

이를 npm 패키지로 다운 받고

`npm install -D @babel/plugin-transform-block-scoping`

`npx babel app.js --plugins @babel/plugin-transform-block-scoping`

로 실행해보면 커스텀 플러그인과 동일하게 동작함을 확인할 수 있다.

마찬가지로, arrow-functions 플러그인을 이용해서 화살표 함수를 일반 함수로 바꿀 수 있다.

`npm install -D @babel/plugin-transform-arrow-functions`

```bash
npx babel app.js --plugins @babel/plugin-transform-block-scoping --plugins  @babel/plugin-transform-arrow-functions
var alert = function (msg) {
  return window.alert(msg);

```

여기서 use strict 구문을 추가해주는 (ES5 부터 지원하는) 플러그인인 strict-mode 플러그인도 사용할 수 있는데, 커멘드라인 명령어가 길어지므로, 설정파일로 분리하는 것이 낫다.

웹팩이 webpack.config.js를 기본 설정파일로 사용하듯, 바벨도 babel.config.js를 사용한다.

-> babel.config.js 추가

이후 `npx babel app.js` 실행
