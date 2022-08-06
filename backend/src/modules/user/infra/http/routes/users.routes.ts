import { Router } from "express";
import { CreateUserController } from '../controllers/CreateUserController'

export const userRouter = Router()
const createUserController = new CreateUserController()

userRouter.post('/', createUserController.handle)