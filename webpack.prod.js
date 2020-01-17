const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { webpackCommom, htmlFiles, jsFiles } = require('./webpack.common');

const HtmlFilesConfig = htmlFiles.map(fileName => {
  let chunks = ['main'];

  // if there is pages-about key in jsFiles object
  // then add it to chunk otherwise only main chunk is added
  // because if condition is not met

  if (`pages-${fileName.slice(0, -5)}` in jsFiles) {
    chunks = [`pages-${fileName.slice(0, -5)}`, ...chunks];
  }

  return new HtmlWebpackPlugin({
    filename: `./${fileName}`,
    template: `./${fileName}`,
    chunks,
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
    new MiniCssExtractPlugin({ filename: '[name].[contentHash].css' }),
    ...HtmlFilesConfig,
  ],
};

module.exports = merge(webpackCommom, prodOptions);
