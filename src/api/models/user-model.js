import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.execute(`
    SELECT user_id, name, username, email, role
    FROM wsk_users
  `);

  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    `
    SELECT user_id, name, username, email, role
    FROM wsk_users
    WHERE user_id = ?
    `,
    [id],
  );

  return rows[0];
};

const findUserByUsername = async (username) => {
  const [rows] = await promisePool.execute(
    `
    SELECT user_id, name, username, email, role, password
    FROM wsk_users
    WHERE username = ?
    `,
    [username],
  );

  return rows[0];
};

const addUser = async (user) => {
  const sql = `
    INSERT INTO wsk_users
      (name, username, email, role, password)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [
    user.name,
    user.username,
    user.email,
    user.role ?? 'user',
    user.password,
  ];

  const [result] = await promisePool.execute(sql, params);

  return {
    user_id: result.insertId,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role ?? 'user',
  };
};

const updateUser = async (id, user) => {
  const sql = `
    UPDATE wsk_users
    SET name = ?, username = ?, email = ?, role = ?
    WHERE user_id = ?
  `;

  const params = [
    user.name,
    user.username,
    user.email,
    user.role,
    id,
  ];

  const [result] = await promisePool.execute(sql, params);

  return result.affectedRows;
};

const deleteUser = async (id) => {
  const connection = await promisePool.getConnection();

  try {
    await connection.beginTransaction();

    await connection.execute(
      'DELETE FROM wsk_cats WHERE owner = ?',
      [id],
    );

    const [result] = await connection.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id],
    );

    await connection.commit();

    return result.affectedRows;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export {
  listAllUsers,
  findUserById,
  findUserByUsername,
  addUser,
  updateUser,
  deleteUser,
};
