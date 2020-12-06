const tar = require('tar');
const {
  promises: { readdir },
} = require('fs');

async function compress() {
  const allFiles = await readdir(__dirname);
  const images = allFiles.filter(fileName => /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(fileName));

  await tar.c(
    {
      gzip: true,
      file: 'wallpapers.tgz',
    },
    images
  );

  console.log('tar file has been created and compressed');
}

compress();
