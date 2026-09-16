import express from 'express';

import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';

import {
  authenticateToken,
  authorizeUser,
} from '../../middlewares/authentication.js';

import {
  userPostValidation,
  userPutValidation,
  validationErrors,
} from '../../middlewares/validators.js';

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(
    userPostValidation,
    validationErrors,
    postUser,
  );

userRouter
  .route('/:id')
  .get(getUserById)
  .put(
    authenticateToken,
    authorizeUser,
    userPutValidation,
    validationErrors,
    putUser,
  )
  .delete(
    authenticateToken,
    authorizeUser,
    deleteUser,
  );

export default userRouter;
