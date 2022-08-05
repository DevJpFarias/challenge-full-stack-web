import { Router } from "express";
import { CreateStudentController } from "../controllers/CreateStudentController";
import { InactivateStudentController } from "../controllers/InactivateStudentController";
import { ListStudentsController } from "../controllers/ListStudentsController";
import { UpdateStudentController } from "../controllers/UpdateStudentController";

export const studentRouter = Router()
const createStudentController = new CreateStudentController()
const listStudentsController = new ListStudentsController()
const updateStudentController = new UpdateStudentController()
const inactivateStudentController = new InactivateStudentController()

studentRouter.post('/students', createStudentController.handle)
studentRouter.get('/students', listStudentsController.handle)
studentRouter.patch('/students/update/:id', updateStudentController.handle)
studentRouter.delete('/students/inactivate/:id', inactivateStudentController.handle)