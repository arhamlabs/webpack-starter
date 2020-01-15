const { ProvidePlugin } = require('webpack');
exports.otherHtmlFilesList = ['privacy', 'tnc'];

exports.webpackCommom = {
  entry: {
    main: './js/main.js',
    home: './js/home.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
