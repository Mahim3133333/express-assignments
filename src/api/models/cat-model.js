const catItems = [
  {
    cat_id: 501,
    cat_name: 'Milo',
    weight: 5.2,
    owner: 1001,
    filename: 'cat.jpg',
    birthdate: '2021-09-18',
  },
  {
    cat_id: 502,
    cat_name: 'Luna',
    weight: 4.1,
    owner: 1002,
    filename: 'luna.jpg',
    birthdate: '2022-03-11',
  },
];

const listAllCats = () => {
  return catItems;
};

const findCatById = (id) => {
  return catItems.find((cat) => cat.cat_id == id);
};

const addCat = (cat) => {
  const newId = catItems[catItems.length - 1].cat_id + 1;

  const newCat = {
    cat_id: newId,
    cat_name: cat.cat_name,
    weight: cat.weight,
    owner: cat.owner,
    filename: cat.filename,
    birthdate: cat.birthdate,
  };

  catItems.push(newCat);

  return newCat;
};

export {listAllCats, findCatById, addCat};