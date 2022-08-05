import { Router } from "express";
import { CreateStudentController } from "../student/controller/CreateStudentController";
import { InactivateStudentController } from "../student/controller/InactivateStudentController";
import { ListStudentsController } from "../student/controller/ListStudentsController";
import { UpdateStudentController } from "../student/controller/UpdateStudentController";

export const studentRouter = Router()
const createStudentController = new CreateStudentController()
const listStudentsController = new ListStudentsController()
const updateStudentController = new UpdateStudentController()
const inactivateStudentController = new InactivateStudentController()

studentRouter.post('/students', createStudentController.handle)
studentRouter.get('/students', listStudentsController.handle)
studentRouter.patch('/students/update/:id', updateStudentController.handle)
studentRouter.delete('/students/inactivate/:id', inactivateStudentController.handle)