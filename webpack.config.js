const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const inputPath = './src/index.tsx'
const outputPath = path.resolve(__dirname, './dist')

module.exports = {
  entry: inputPath,
  target: 'node',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'html-metadata-resolver.js',
    path: outputPath,
    library: 'html-metadata-resolver',
    libraryTarget: 'umd'
  },
  plugins: [
    new CleanWebpackPlugin([outputPath])
  ]
};