const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/public/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: 'js/[name].js',
    clean: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', "css-loader"],
      },
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
    new HtmlWebpackPlugin({ 
      template : 'src/public/index.html' ,
      excludeChunks: ['server']
    })
  ],
};
