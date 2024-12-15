import express from 'express'
import v1Router from './api'
const apiRouter = express.Router();

apiRouter.use('/api',v1Router)


export default apiRouter

