import express from 'express';

import {
  login,
  getMe,
} from '../controllers/auth-controller.js';

import {
  authenticateToken,
} from '../../middlewares/authentication.js';

import {
  loginValidation,
  validationErrors,
} from '../../middlewares/validators.js';

const authRouter = express.Router();

authRouter.post(
  '/login',
  loginValidation,
  validationErrors,
  login,
);

authRouter.get(
  '/me',
  authenticateToken,
  getMe,
);

export default authRouter;
