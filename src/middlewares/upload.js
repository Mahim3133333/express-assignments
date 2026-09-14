import multer from 'multer';
import sharp from 'sharp';
import path from 'node:path';

const upload = multer({
  dest: 'uploads/',
});

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }

  try {
    console.log('Uploaded file:', req.file.path);

    const thumbnailName = `${req.file.filename}_thumb.png`;

    const thumbnailPath = path.join(
      'uploads',
      thumbnailName
    );

    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(thumbnailPath);

    console.log('Thumbnail created:', thumbnailPath);

    next();
  } catch (error) {
    next(error);
  }
};

export {upload, createThumbnail};