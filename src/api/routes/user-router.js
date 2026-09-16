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

const userRouter = express.Router();

userRouter
  .route('/')
  .get(getUsers)
  .post(postUser);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, authorizeUser, putUser)
  .delete(authenticateToken, authorizeUser, deleteUser);

export default userRouter;
