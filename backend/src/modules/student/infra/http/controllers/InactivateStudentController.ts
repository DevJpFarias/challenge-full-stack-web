import { Request, Response } from "express";
import { StudentsRepository } from "../../typeorm/repositories/StudentsRepository";
import { InactivateStudentService } from "../../../service/InactivateStudent/InactivateStudentService";

const studentsRepository = new StudentsRepository()

export class InactivateStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const inactivateStudentService = new InactivateStudentService(studentsRepository)

    await inactivateStudentService.execute(id)

    return response.status(204).send()
  }
}