import { Router } from "express";
import { CreateUserController } from "../users/controller/CreateUserController";

export const userRouter = Router()
const createUserController = new CreateUserController()

userRouter.post('/users', createUserController.handle)