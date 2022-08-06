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

studentRouter.post('/', createStudentController.handle)
studentRouter.get('/', listStudentsController.handle)
studentRouter.patch('/update/:id', updateStudentController.handle)
studentRouter.delete('/inactivate/:id', inactivateStudentController.handle)