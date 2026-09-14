import {
  listAllCats,
  findCatById,
  addCat,
} from '../models/cat-model.js';

const getCats = (req, res) => {
  const cats = listAllCats();
  res.json(cats);
};

const getCatById = (req, res) => {
  const cat = findCatById(req.params.id);

  if (cat) {
    res.json(cat);
  } else {
    res.status(404).json({
      message: 'Cat not found',
    });
  }
};

const postCat = (req, res) => {
  console.log('Form data:', req.body);
  console.log('File data:', req.file);

  if (!req.file) {
    return res.status(400).json({
      message: 'Cat image is required.',
    });
  }

  const catData = {
    cat_name: req.body.cat_name,
    weight: Number(req.body.weight),
    owner: Number(req.body.owner),
    birthdate: req.body.birthdate,
    filename: req.file.filename,
  };

  const newCat = addCat(catData);

  res.status(201).json({
    message: 'New cat added.',
    cat: newCat,
  });
};

const putCat = (req, res) => {
  res.json({
    message: 'Cat item updated.',
  });
};

const deleteCat = (req, res) => {
  res.json({
    message: 'Cat item deleted.',
  });
};

export {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
};