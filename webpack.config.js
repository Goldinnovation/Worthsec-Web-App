import path from "path";

export default {
  mode: "production",
  entry: "./server/app.ts",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  target: "node",
};
