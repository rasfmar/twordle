const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

const PATH_SOURCE = path.join(__dirname, "./src");
const PATH_DIST = path.join(__dirname, "./dist");

module.exports = (_, argv) => {
  const { mode } = argv;
  return {
    mode,
    devtool: "source-map",
    entry: [
      path.join(PATH_SOURCE, "./index.tsx")
    ],
    output: {
      path: PATH_DIST,
      filename: "js/[name].[fullhash].js",
      clean: true
    },
    devServer: {
      static: {
        directory: PATH_DIST
      },
      hot: true,
      port: 8080,
      liveReload: false,
      compress: mode === "production",
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/i,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.scss$/i,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.svg$/i,
          loader: "svg-url-loader"
        },
        {
          enforce: "pre",
          test: /\.jsx?$/i,
          loader: "source-map-loader"
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".scss"]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(PATH_SOURCE, "./index.html")
      }),
      new ReactRefreshWebpackPlugin(),
      new ESLintWebpackPlugin({
        context: "./",
        emitError: true,
        emitWarning: true,
        failOnError: true,
        extensions: ["ts", "tsx"],
        overrideConfigFile: "./.eslintrc.js"
      })
    ]
  };
};


// const CopyPlugin = require("copy-webpack-plugin");
// const PATH_STATIC = path.join(__dirname, "./static");
/*
for static assets:
new CopyPlugin({
  patterns: [{
    from: PATH_STATIC,
    to: PATH_DIST
  }],
})
*/