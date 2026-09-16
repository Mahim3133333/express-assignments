import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import {
  findUserByUsername,
  findUserById,
} from '../models/user-model.js';

const login = async (req, res) => {
  try {
    const {username, password} = req.body;

    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(401).json({message: 'Invalid username or password.'});
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({message: 'Invalid username or password.'});
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
    console.error(error);
    res.status(500).json({message: 'Login failed.'});
  }
};

const getMe = async (req, res) => {
  try {
    const user = await findUserById(res.locals.user.user_id);

    if (!user) {
      return res.status(404).json({message: 'User not found.'});
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

export {login, getMe};
