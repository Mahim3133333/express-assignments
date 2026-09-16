import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import {
  findUserByUsername,
  findUserById,
} from '../models/user-model.js';

const login = async (req, res, next) => {
  try {
    const {username, password} = req.body;

    const user = await findUserByUsername(username);

    if (!user) {
      const error = new Error('Invalid username or password.');
      error.status = 401;
      return next(error);
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password,
    );

    if (!passwordMatch) {
      const error = new Error('Invalid username or password.');
      error.status = 401;
      return next(error);
    }

    const token = jwt.sign(
      {
        user_id: user.user_id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {expiresIn: '24h'},
    );

    res.json({
      message: 'Login successful.',
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await findUserById(
      res.locals.user.user_id,
    );

    if (!user) {
      const error = new Error('User not found.');
      error.status = 404;
      return next(error);
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

export {
  login,
  getMe,
};
