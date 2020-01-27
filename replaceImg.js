const glob = require('glob');
const fs = require('fs');
const cheerio = require('cheerio');

const htmlFiles = glob.sync('./dist/**/*.html');

htmlFiles.forEach(file => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) return console.log(err);

    changeImageTag = () => {
      const $ = cheerio.load(data);
      const images = $('img');

      images.each(function() {
        const thisRef = $(this);
        const imageSrcWithoutExt = thisRef
          .attr('src')
          .split('.')
          .slice(0, -1)
          .join('.');

        const imageExt = thisRef
          .attr('src')
          .split('.')
          .pop();

        let pictureType = '';

        if (imageExt === 'png') pictureType = 'png';
        else if (['jpeg', 'jpg'].includes(imageExt)) pictureType = 'jpeg';
        else if (imageExt === 'svg') 'svg+xml';
        else if (imageExt === 'gif') pictureType = 'gif';

        $(this).replaceWith(
          $(
            `<picture><source type="image/webp" srcset="${imageSrcWithoutExt}.webp"><source type="image/${pictureType}" srcset="${thisRef.attr(
              'src'
            )}">${thisRef}</picture>`
          )
        );
      });

      const updatedHTML = $.html();

      return updatedHTML;
    };

    fs.writeFile(`./dist/${file.slice(6)}`, changeImageTag(), 'utf8', err => {
      if (err) return console.log(err);
    });
  });
});
