import bcrypt from 'bcrypt';

import {
  listAllUsers,
  findUserById,
  addUser,
  updateUser,
  deleteUser as deleteUserFromDb,
} from '../models/user-model.js';

const getUsers = async (req, res) => {
  try {
    const users = await listAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      return res.status(404).json({message: 'User not found.'});
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

const postUser = async (req, res) => {
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
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

const putUser = async (req, res) => {
  try {
    const oldUser = await findUserById(req.params.id);

    if (!oldUser) {
      return res.status(404).json({message: 'User not found.'});
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
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

const deleteUser = async (req, res) => {
  try {
    const affectedRows = await deleteUserFromDb(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({message: 'User not found.'});
    }

    res.json({message: 'User item deleted.'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

export {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};
