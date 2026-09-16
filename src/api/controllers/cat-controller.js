import {
  listAllCats,
  findCatById,
  findCatsByUserId,
  addCat,
  updateCat,
  deleteCat as deleteCatFromDb,
} from '../models/cat-model.js';

const getCats = async (req, res) => {
  try {
    const cats = await listAllCats();
    res.json(cats);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

const getCatById = async (req, res) => {
  try {
    const cat = await findCatById(req.params.id);

    if (!cat) {
      return res.status(404).json({message: 'Cat not found.'});
    }

    res.json(cat);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

const getCatsByUserId = async (req, res) => {
  try {
    const cats = await findCatsByUserId(req.params.id);
    res.json(cats);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

const postCat = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({message: 'Cat image is required.'});
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
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

const putCat = async (req, res) => {
  try {
    const oldCat = await findCatById(req.params.id);

    if (!oldCat) {
      return res.status(404).json({message: 'Cat not found.'});
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
    console.error(error);
    res.status(500).json({message: 'Database error.'});
  }
};

const deleteCat = async (req, res) => {
  try {
    const affectedRows = await deleteCatFromDb(req.params.id);

    if (affectedRows === 0) {
      return res.status(404).json({message: 'Cat not found.'});
    }

    res.json({message: 'Cat item deleted.'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Database error.'});
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
