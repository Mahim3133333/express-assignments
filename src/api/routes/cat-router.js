import express from 'express';

import {
  getCats,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import {
  upload,
  createThumbnail,
} from '../../middlewares/upload.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getCats)
  .post(
    upload.single('cat'),
    createThumbnail,
    postCat,
  );

catRouter.get('/user/:id', getCatsByUserId);

catRouter
  .route('/:id')
  .get(getCatById)
  .put(putCat)
  .delete(deleteCat);

export default catRouter;
