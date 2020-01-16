const path = require('path');
const glob = require('glob');
const { ProvidePlugin } = require('webpack');

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
        test: /\.(png|jpe?g|gif|svg|woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts',
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
  ],
  resolve: {
    alias: {
      Js: path.resolve(__dirname, 'src/scripts/'),
      Scss: path.resolve(__dirname, 'src/scss/'),
      Images: path.resolve(__dirname, 'src/assets/images/'),
      Fonts: path.resolve(__dirname, 'src/assets/fonts/'),
    },
  },
};
