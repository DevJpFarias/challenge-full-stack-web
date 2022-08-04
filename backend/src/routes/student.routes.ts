import { Router } from "express";
import { CreateStudentController } from "../student/controller/CreateStudentController";

export const studentRouter = Router()
const createStudentController = new CreateStudentController()

studentRouter.post('/students', createStudentController.handle)