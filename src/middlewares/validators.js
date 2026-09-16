import {
  body,
  validationResult,
} from 'express-validator';

const validationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed.',
      errors: errors.array(),
    });
  }

  next();
};

const userPostValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({min: 2, max: 100})
    .withMessage('Name must be 2-100 characters.'),

  body('username')
    .trim()
    .isLength({min: 3, max: 20})
    .withMessage('Username must be 3-20 characters.')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers.'),

  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required.')
    .normalizeEmail(),

  body('password')
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters.'),
];

const userPutValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({min: 2, max: 100})
    .withMessage('Name must be 2-100 characters.'),

  body('username')
    .optional()
    .trim()
    .isLength({min: 3, max: 20})
    .withMessage('Username must be 3-20 characters.')
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers.'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Valid email is required.')
    .normalizeEmail(),
];

const loginValidation = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required.'),

  body('password')
    .notEmpty()
    .withMessage('Password is required.'),
];

const catPostValidation = [
  body('cat_name')
    .trim()
    .isLength({min: 3, max: 50})
    .withMessage('Cat name must be 3-50 characters.'),

  body('weight')
    .isFloat({gt: 0})
    .withMessage('Weight must be a positive number.')
    .toFloat(),

  body('owner')
    .isInt({min: 1})
    .withMessage('Owner must be a valid user id.')
    .toInt(),

  body('birthdate')
    .isISO8601()
    .withMessage('Birthdate must be a valid date.'),
];

const catPutValidation = [
  body('cat_name')
    .optional()
    .trim()
    .isLength({min: 3, max: 50})
    .withMessage('Cat name must be 3-50 characters.'),

  body('weight')
    .optional()
    .isFloat({gt: 0})
    .withMessage('Weight must be a positive number.')
    .toFloat(),

  body('owner')
    .optional()
    .isInt({min: 1})
    .withMessage('Owner must be a valid user id.')
    .toInt(),

  body('birthdate')
    .optional()
    .isISO8601()
    .withMessage('Birthdate must be a valid date.'),
];

export {
  validationErrors,
  userPostValidation,
  userPutValidation,
  loginValidation,
  catPostValidation,
  catPutValidation,
};
