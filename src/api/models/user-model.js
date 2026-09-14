const userItems = [
  {
    user_id: 1001,
    name: 'Nadia Rahman',
    username: 'nadia',
    email: 'nadia@example.com',
    role: 'user',
    password: 'password123',
  },
  {
    user_id: 1002,
    name: 'Sami Khan',
    username: 'sami',
    email: 'sami@example.com',
    role: 'user',
    password: 'mypassword',
  },
];

const listAllUsers = () => {
  return userItems;
};

const findUserById = (id) => {
  return userItems.find((user) => user.user_id == id);
};

const addUser = (user) => {
  const newId = userItems[userItems.length - 1].user_id + 1;

  const newUser = {
    user_id: newId,
    name: user.name,
    username: user.username,
    email: user.email,
    role: 'user',
    password: user.password,
  };

  userItems.push(newUser);

  return newUser;
};

export {listAllUsers, findUserById, addUser};