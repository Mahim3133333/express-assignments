import {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  updateCat,
  deleteCat as deleteCatFromDb,
} from '../models/cat-model.js';

const getCats = async (req, res, next) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const getCatById = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);

    if (!cat) {
      const error = new Error('Cat not found.');
      error.status = 404;
      return next(error);
    }

    res.json(cat);
  } catch (error) {
    next(error);
  }
};

const getCatsByUserId = async (req, res, next) => {
  try {
    const cats = await findCatsByUserId(req.params.id);
    res.json(cats);
  } catch (error) {
    next(error);
  }
};

const postCat = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error('Cat image is required.');
      error.status = 400;
      return next(error);
    }

    const catData = {
      cat_name: req.body.cat_name,
      weight: Number(req.body.weight),
      owner: Number(req.body.owner),
      filename: req.file.filename,
      birthdate: req.body.birthdate,
    };

    const newCat = await addCat(catData);

    res.status(201).json({
      message: 'New cat added.',
      cat: newCat,
    });
  } catch (error) {
    next(error);
  }
};

const putCat = async (req, res, next) => {
  try {
    const oldCat = await findCatById(req.params.id);

    if (!oldCat) {
      const error = new Error('Cat not found.');
      error.status = 404;
      return next(error);
    }

    const catData = {
      cat_name: req.body.cat_name ?? oldCat.cat_name,
      weight:
        req.body.weight !== undefined
          ? Number(req.body.weight)
          : Number(oldCat.weight),
      owner:
        req.body.owner !== undefined
          ? Number(req.body.owner)
          : oldCat.owner,
      filename: oldCat.filename,
      birthdate: req.body.birthdate ?? oldCat.birthdate,
    };

    await updateCat(req.params.id, catData);

    const updatedCat = await findCatById(req.params.id);

    res.json({
      message: 'Cat item updated.',
      cat: updatedCat,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCat = async (req, res, next) => {
  try {
    const affectedRows = await deleteCatFromDb(req.params.id);

    if (affectedRows === 0) {
      const error = new Error('Cat not found.');
      error.status = 404;
      return next(error);
    }

    res.json({message: 'Cat item deleted.'});
  } catch (error) {
    next(error);
  }
};

export {
  getCats,
  getCatById,
  getCatsByUserId,
  postCat,
  putCat,
  deleteCat,
};
