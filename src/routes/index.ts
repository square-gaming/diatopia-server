import {Express} from 'express';
import apiRouter from './api';

const route = (app: Express): void => {
  app.use('/api', apiRouter);
};

export default route;
