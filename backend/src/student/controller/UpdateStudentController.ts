import { Request, Response } from "express";
import { StudentsRepository } from "../repository/StudentsRepository";
import { UpdateStudentService } from "../service/UpdateStudent/UpdateStudentService";

const studentsRepository = new StudentsRepository()

export class UpdateStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, RA, CPF } = request.body

    const updateStudentService = new UpdateStudentService(studentsRepository)

    const update_student = await updateStudentService.execute(
      id,
      name,
      email,
      RA,
      CPF
    )

    return response.status(201).json(update_student)
  }
}