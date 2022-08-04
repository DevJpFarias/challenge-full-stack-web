import { Router } from "express";
import { CreateStudentController } from "../student/controller/CreateStudentController";
import { ListStudentsController } from "../student/controller/ListStudentsController";

export const studentRouter = Router()
const createStudentController = new CreateStudentController()
const listStudentsController = new ListStudentsController()

studentRouter.post('/students', createStudentController.handle)
studentRouter.get('/students', listStudentsController.handle)