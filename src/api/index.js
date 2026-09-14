import express from 'express';
import catRouter from './routes/cat-router.js';
import userRouter from './routes/user-router.js';

const apiRouter = express.Router();

apiRouter.use('/cats', catRouter);
apiRouter.use('/users', userRouter);

export default apiRouter;