module.exports = api => {
  const plugins = [];
  if (api.env() === "development")
    plugins.push("react-refresh/babel");

  return {
    presets: [
      ["@babel/preset-env", {
        // debug: true,
        useBuiltIns: "usage",
        corejs: 3
      }],
      ["@babel/preset-react", {
        runtime: "automatic"
      }],
      "@babel/preset-typescript"
    ],
    plugins
  };
};
