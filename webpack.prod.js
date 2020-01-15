const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpackCommom, otherHtmlFilesList } = require('./webpack.common');

const IndexHtmlFileConfig = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './index.html',
  chunks: ['main', 'home'],
  minify: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  },
});

const otherHtmlFilesConfig = otherHtmlFilesList.map(fileName => {
  return new HtmlWebpackPlugin({
    filename: `${fileName}.html`,
    template: `${__dirname}/${fileName}.html`,
    chunks: ['main'],
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
  });
});

const prodOptions = {
  mode: 'production',
  output: {
    filename: '[name].[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s[ac]|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      { from: 'favicon.ico', to: 'favicon.ico' },
      { from: 'images', to: 'images' },
    ]),
    new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
    IndexHtmlFileConfig,
    ...otherHtmlFilesConfig,
  ],
};

module.exports = merge(webpackCommom, prodOptions);
