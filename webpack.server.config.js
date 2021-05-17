const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    server: './src/server/server.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/server'),
    filename: '[name].js',
    clean: true
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "src/server/db", 
          to: "db/[name].[ext]" 
        }
      ],
    }),
  ],
};
