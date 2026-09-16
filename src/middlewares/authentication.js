import jwt from 'jsonwebtoken';
import 'dotenv/config';

import {findCatById} from '../api/models/cat-model.js';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({message: 'Authentication required.'});
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = user;
    next();
  } catch (error) {
    return res.status(401).json({message: 'Invalid or expired token.'});
  }
};

const authorizeUser = (req, res, next) => {
  const loggedInUser = res.locals.user;
  const requestedUserId = Number(req.params.id);

  if (
    loggedInUser.role === 'admin' ||
    loggedInUser.user_id === requestedUserId
  ) {
    return next();
  }

  return res.status(403).json({message: 'Not authorized.'});
};

const authorizeCatOwner = async (req, res, next) => {
  try {
    const loggedInUser = res.locals.user;

    if (loggedInUser.role === 'admin') {
      return next();
    }

    const cat = await findCatById(req.params.id);

    if (!cat) {
      return res.status(404).json({message: 'Cat not found.'});
    }

    if (cat.owner === loggedInUser.user_id) {
      return next();
    }

    return res.status(403).json({message: 'Not authorized.'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Authorization failed.'});
  }
};

export {
  authenticateToken,
  authorizeUser,
  authorizeCatOwner,
};
