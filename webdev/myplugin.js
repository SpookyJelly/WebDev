module.exports = function myplugin() {
  return {
    visitor: {
      // Identifier(path) {
      //   const name = path.node.name;
      //   console.log("Identifier Name", name);
      //   path.node.name = name.split("").reverse().join("");
      // },
      // https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-block-scoping/src/index.js#L26
      VariableDeclaration(path) {
        console.log("VariableDeclaration() kind:", path.node.kind); // const

        if (path.node.kind === "const") {
          path.node.kind = "var";
        }
      },
    },
  };
};
