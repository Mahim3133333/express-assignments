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

import {
  authenticateToken,
  authorizeCatOwner,
} from '../../middlewares/authentication.js';

import {
  catPostValidation,
  catPutValidation,
  validationErrors,
} from '../../middlewares/validators.js';

const catRouter = express.Router();

catRouter
  .route('/')
  .get(getCats)
  .post(
    upload.single('cat'),
    catPostValidation,
    validationErrors,
    createThumbnail,
    postCat,
  );

catRouter.get('/user/:id', getCatsByUserId);

catRouter
  .route('/:id')
  .get(getCatById)
  .put(
    authenticateToken,
    authorizeCatOwner,
    catPutValidation,
    validationErrors,
    putCat,
  )
  .delete(
    authenticateToken,
    authorizeCatOwner,
    deleteCat,
  );

export default catRouter;
