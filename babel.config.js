module.exports = function (api) {
  api.cache(true);
  return {
    "presets": [
      [
        "@expo/next-adapter/babel",
        {
          "styled-jsx": {
            "plugins": [
              "@styled-jsx/plugin-sass"
            ]
          }
        }
      ]
    ],

    "plugins": [
      ["@babel/plugin-proposal-class-properties", { "loose": false }],
      ["module-resolver", {
        root: ["."],
        alias: {
          "@": "./",
          "~": "./src",
        }
      }]
    ],
  };
};
