import {
  listAllUsers,
  findUserById,
  addUser,
} from '../models/user-model.js';

const getUsers = (req, res) => {
  res.json(listAllUsers());
};

const getUserById = (req, res) => {
  const user = findUserById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({message: 'User not found'});
  }
};

const postUser = (req, res) => {
  const newUser = addUser(req.body);

  res.status(201).json({
    message: 'New user added.',
    user: newUser,
  });
};

const putUser = (req, res) => {
  res.json({
    message: 'User item updated.',
  });
};

const deleteUser = (req, res) => {
  res.json({
    message: 'User item deleted.',
  });
};

export {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
};