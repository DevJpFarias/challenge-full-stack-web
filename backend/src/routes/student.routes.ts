import { Router } from "express";
import { CreateStudentController } from "../student/controller/CreateStudentController";
import { ListStudentsController } from "../student/controller/ListStudentsController";
import { UpdateStudentController } from "../student/controller/UpdateStudentController";

export const studentRouter = Router()
const createStudentController = new CreateStudentController()
const listStudentsController = new ListStudentsController()
const updateStudentController = new UpdateStudentController()

studentRouter.post('/students', createStudentController.handle)
studentRouter.get('/students', listStudentsController.handle)
studentRouter.patch('/students/update/:id', updateStudentController.handle)