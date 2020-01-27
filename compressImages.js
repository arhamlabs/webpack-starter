// WIP

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminOptipng = require('imagemin-optipng');
const imageminWebp = require('imagemin-webp');

const path = './dist/assets/images';

(async () => {
  const files = await imagemin([`${path}/*.{jpg,png}`], {
    destination: path,
    plugins: [imageminWebp({}), imageminOptipng({}), imageminJpegtran({})],
  });

  // console.log(files);
})();
