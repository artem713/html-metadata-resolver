const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const inputPath = './src/index.tsx'
const outputPath = path.resolve(__dirname, './dist')

const port = 8714

module.exports = {
  entry: inputPath,
  target: 'web',
  devtool: 'source-map', // for development only!
  devServer: {
    contentBase: 'dist',
    compress: true,
    port,
    host: '0.0.0.0',
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'index.js',
    path: outputPath
  },
  plugins: [
    new CleanWebpackPlugin([outputPath]),
    new HtmlWebpackPlugin()
  ]
};