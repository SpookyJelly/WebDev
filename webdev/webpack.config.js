const path = require("path");
const MyPlugin = require("./myplugin");

module.exports = {
  mode: "development", // node_modules/.bin/webpack에서의 --mode flag
  entry: {
    main: "./app.js", // 상동. --entry flag
  },
  output: {
    filename: "[name].js", // entry에 추가한 파일이 [name]으로 들어오는 일종의 디렉티브
    path: path.resolve("./dist"), //path 모듈의 resolve를 사용. path는 node 코어 모듈중 하나로 경로를 처리하는 기능을 가진다
    assetModuleFilename: "[hash][ext][query]", //file-loader output
  },
  module: {
    // 로더를 쓰기 위한 설정 (로더도 모듈이라는 사실 기억)
    rules: [
      //     {
      //       test: /\.js$/, // js 확장자로 끝나는 모든 파일
      //       use: [path.resolve("./myloader.js")], // 실제 사용할 로더
      //     },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.png$/,
      //   type: "asset/resource",
      // },
      // {
      //   test: /\.png$/,
      //   type: "asset/inline",
      //   options: {
      //     limit: 5000,
      //   },
      // },
      {
        test: /\.png$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 5000,
          },
        },
      },
    ],
  },
  plugins: [new MyPlugin()],
};
