import { Router } from "express";
import { AuthenticateUserController } from "../controllers/AuthenticateUserControlle";

export const authenticateRouter = Router()
const authenticateUserController = new AuthenticateUserController()

authenticateRouter.post('/session', authenticateUserController.handle)