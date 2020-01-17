const path = require('path');
const glob = require('glob');
const { ProvidePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let entry = {};
let htmlFiles = [];

glob.sync('./src/scripts/**/*.js').forEach(file => {
  const fileNameWithOutExt = file.slice(14, -3);

  // Replace / in file name with -
  // eg) 'pages/about' becomes 'pages-about'

  const fileName = fileNameWithOutExt.includes('/')
    ? fileNameWithOutExt.replace('/', '-')
    : fileNameWithOutExt;

  entry[fileName] = `./${file.slice(6, -3)}`;
});

glob.sync('./src/**/*.html').forEach(file => {
  // './src/index.html' becomes 'index.html'
  htmlFiles = [`${file.slice(6)}`, ...htmlFiles];
});

exports.htmlFiles = htmlFiles;
exports.jsFiles = entry;

exports.webpackCommom = {
  context: `${__dirname}/src`,
  entry,
  module: {
    rules: [
      {
        test: /.\html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/images',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/fonts',
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // So we dont need to import jquery everywhere
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin([{ from: 'favicon.ico', to: 'favicon.ico' }]),
  ],
  resolve: {
    alias: {
      Js: path.join(__dirname, 'src/scripts/'),
      Scss: path.join(__dirname, 'src/scss/'),
      Images: path.join(__dirname, 'src/assets/images/'),
      Fonts: path.join(__dirname, 'src/assets/fonts/'),
    },
  },
};
