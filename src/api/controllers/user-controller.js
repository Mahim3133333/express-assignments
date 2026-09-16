import bcrypt from 'bcrypt';

import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  deleteUser as deleteUserFromDb,
} from '../models/user-model.js';

const getUsers = async (req, res, next) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id);

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

const postUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role ?? 'user',
    };

    const newUser = await addUser(userData);

    res.status(201).json({
      message: 'New user added.',
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const putUser = async (req, res, next) => {
  try {
    const oldUser = await findUserById(req.params.id);

    if (!oldUser) {
      const error = new Error('User not found.');
      error.status = 404;
      return next(error);
    }

    const userData = {
      name: req.body.name ?? oldUser.name,
      username: req.body.username ?? oldUser.username,
      email: req.body.email ?? oldUser.email,
      role: req.body.role ?? oldUser.role,
    };

    await updateUser(req.params.id, userData);

    const updatedUser = await findUserById(req.params.id);

    res.json({
      message: 'User item updated.',
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const affectedRows = await deleteUserFromDb(req.params.id);

    if (affectedRows === 0) {
      const error = new Error('User not found.');
      error.status = 404;
      return next(error);
    }

    res.json({message: 'User item deleted.'});
  } catch (error) {
    next(error);
  }
};

export {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
