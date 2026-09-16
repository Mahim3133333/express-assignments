const notFoundHandler = (req, res, next) => {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

const errorHandler = (error, req, res, next) => {
  console.error(error);

  const status = error.status || 500;

  res.status(status).json({
    message: error.message || 'Internal server error.',
  });
};

export {
  notFoundHandler,
  errorHandler,
};
