import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const [rows] = await promisePool.execute(`
    SELECT
      c.cat_id,
      c.cat_name,
      c.weight,
      c.owner,
      c.filename,
      c.birthdate,
      u.name AS owner_name
    FROM wsk_cats AS c
    JOIN wsk_users AS u ON c.owner = u.user_id
  `);

  return rows;
};

const findCatById = async (id) => {
  const [rows] = await promisePool.execute(
    `
    SELECT
      c.cat_id,
      c.cat_name,
      c.weight,
      c.owner,
      c.filename,
      c.birthdate,
      u.name AS owner_name
    FROM wsk_cats AS c
    JOIN wsk_users AS u ON c.owner = u.user_id
    WHERE c.cat_id = ?
    `,
    [id],
  );

  return rows[0];
};

const findCatsByUserId = async (userId) => {
  const [rows] = await promisePool.execute(
    `
    SELECT
      c.cat_id,
      c.cat_name,
      c.weight,
      c.owner,
      c.filename,
      c.birthdate,
      u.name AS owner_name
    FROM wsk_cats AS c
    JOIN wsk_users AS u ON c.owner = u.user_id
    WHERE c.owner = ?
    `,
    [userId],
  );

  return rows;
};

const addCat = async (cat) => {
  const sql = `
    INSERT INTO wsk_cats
      (cat_name, weight, owner, filename, birthdate)
    VALUES (?, ?, ?, ?, ?)
  `;

  const params = [
    cat.cat_name,
    cat.weight,
    cat.owner,
    cat.filename,
    cat.birthdate,
  ];

  const [result] = await promisePool.execute(sql, params);

  return {
    cat_id: result.insertId,
    ...cat,
  };
};

const updateCat = async (id, cat) => {
  const sql = `
    UPDATE wsk_cats
    SET cat_name = ?, weight = ?, owner = ?, filename = ?, birthdate = ?
    WHERE cat_id = ?
  `;

  const params = [
    cat.cat_name,
    cat.weight,
    cat.owner,
    cat.filename,
    cat.birthdate,
    id,
  ];

  const [result] = await promisePool.execute(sql, params);

  return result.affectedRows;
};

const deleteCat = async (id) => {
  const [result] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id],
  );

  return result.affectedRows;
};

export {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  updateCat,
  deleteCat,
};
