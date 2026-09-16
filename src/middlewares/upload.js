import multer from 'multer';
import sharp from 'sharp';
import path from 'node:path';

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error(
      'Only JPEG, PNG and WEBP image files are allowed.',
    );
    error.status = 400;
    cb(error, false);
  }
};

const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter,
});

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const thumbnailName = `${req.file.filename}_thumb.png`;

    const thumbnailPath = path.join(
      'uploads',
      thumbnailName,
    );

    await sharp(req.file.path)
      .resize(160, 160)
      .png()
      .toFile(thumbnailPath);

    next();
  } catch (error) {
    next(error);
  }
};

export {
  upload,
  createThumbnail,
};
