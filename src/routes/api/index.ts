import express from 'express';
import router from './v1';
const v1Router=express.Router();


v1Router.use('/v1',router);

export default v1Router