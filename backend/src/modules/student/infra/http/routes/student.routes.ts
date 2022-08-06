import { Router } from "express";
import { ensureAdmin } from "../../../../../shared/middlewares/ensureAdmin";
import { ensureAuthenticated } from "../../../../../shared/middlewares/ensureAuthenticated";
import { CreateStudentController } from "../controllers/CreateStudentController";
import { InactivateStudentController } from "../controllers/InactivateStudentController";
import { ListStudentsController } from "../controllers/ListStudentsController";
import { UpdateStudentController } from "../controllers/UpdateStudentController";

export const studentRouter = Router()
const createStudentController = new CreateStudentController()
const listStudentsController = new ListStudentsController()
const updateStudentController = new UpdateStudentController()
const inactivateStudentController = new InactivateStudentController()

studentRouter.post('/', ensureAuthenticated, ensureAdmin, createStudentController.handle)
studentRouter.get('/', ensureAuthenticated, ensureAdmin, listStudentsController.handle)
studentRouter.patch('/update/:id', ensureAuthenticated, ensureAdmin, updateStudentController.handle)
studentRouter.delete('/inactivate/:id', ensureAuthenticated, ensureAdmin, inactivateStudentController.handle)