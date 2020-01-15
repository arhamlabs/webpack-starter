const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpackCommom, otherHtmlFilesList } = require('./webpack.common');

const IndexHtmlFileConfig = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: `${__dirname}/index.html`,
  chunks: ['main', 'home'],
  minify: false,
  inject: true,
  hash: true,
});

const otherHtmlFilesConfig = otherHtmlFilesList.map(fileName => {
  return new HtmlWebpackPlugin({
    filename: `${fileName}.html`,
    template: `${__dirname}/${fileName}.html`,
    chunks: ['main'],
    minify: false,
    inject: true,
    hash: true,
  });
});

const devOptions = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [IndexHtmlFileConfig, ...otherHtmlFilesConfig],
};

module.exports = merge(webpackCommom, devOptions);
