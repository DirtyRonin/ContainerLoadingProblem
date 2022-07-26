const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: ["./src/index.tsx"],
    vendor: ["react", "react-dom"],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "src/"),
      api: path.resolve(__dirname, "src/api/"),
    },
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(sass|less|css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ["file-loader?name=[name].[ext]"],
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Container Loading Client",
      template: "./public/index.html",
      filename: "index.html",
      favicon: "./public/favicon.ico",
      hash: true, // This is useful for cache busting,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath:'/'
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8000,
    client: {
      logging: "info",
      progress: true,
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
  watchOptions: {
    poll: 1000,
    ignored: "**/node_modules",
    aggregateTimeout: 600,
  },
};
