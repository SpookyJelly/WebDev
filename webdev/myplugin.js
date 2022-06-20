const { Compilation, sources } = require("webpack");

class MyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap("MyPlugin", (stats) => {
      console.log("MyPlugin: done");
    });
    //     compiler.hooks.thisCompilation.tap("MyPlugin", (compilation) => {
    //       compilation.hooks.processAssets.tap(
    //         {
    //           name: "MyPlugin",
    //           stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
    //         },
    //         () => {
    //           console.log("compilation", compilation);
    //           // get the file main.js
    //           const file = compilation.getAsset("main.js");
    //           // update main.js with new content
    //           //   compilation.updateAsset(
    //           //     "main.js",
    //           //     new sources.RawSource(file.source.source().replace("a", "b"))
    //           //   );
    //           // }
    //           const banner = ["work it please"];
    //           return banner + "\n" + file;
    //         }
    //       );
    //     });
    //   }
  }
}

module.exports = MyPlugin;
