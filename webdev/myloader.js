module.exports = function myloader(content) {
  console.log("my loader works!");
  //   return content
  return content.replace("console.log(", "alert("); // 로더가 무슨 역할을 하는지, console.log( ) 을 alert으로 변경
  // main.js는 console.log로 찍혀있는데 serve로 띄운 웹에서는 alert으로 되어있다.
};
