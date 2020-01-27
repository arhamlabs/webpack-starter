const path = require('path');
const merge = require('webpack-merge');
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
    minify: false,
    inject: true,
    hash: true,
  });
});

const devOptions = {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
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
  plugins: [...HtmlFilesConfig],
};

module.exports = merge(webpackCommom, devOptions);
