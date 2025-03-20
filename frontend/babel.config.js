module.exports = {
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@components": "./src/components",
        "@views": "./src/views"
      }
    }]
  ]
};
