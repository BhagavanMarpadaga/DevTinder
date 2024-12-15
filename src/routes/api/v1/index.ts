import express from 'express'
import profileRouter from './profile'
import authRouter from './auth'
import { userAuthMiddleware } from "../../../middleware/userAuthMiddleWare"
import connectionRequestRouter from './connectionRequest'

const router = express.Router()

router.use('/profile',userAuthMiddleware,profileRouter)
router.use('/user',authRouter)
router.use('/request',userAuthMiddleware,connectionRequestRouter)
export default router;
