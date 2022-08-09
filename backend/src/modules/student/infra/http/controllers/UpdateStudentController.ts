import { Request, Response } from "express";
import { StudentsRepository } from "../../typeorm/repositories/StudentsRepository";
import { UpdateStudentService } from "../../../service/UpdateStudent/UpdateStudentService";
import { UsersRepository } from "../../../../user/infra/typeorm/repositories/UsersRepository";
import { instanceToInstance } from "class-transformer";

const studentsRepository = new StudentsRepository()
const usersRepository = new UsersRepository()

export class UpdateStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, RA, CPF } = request.body

    const updateStudentService = new UpdateStudentService(studentsRepository, usersRepository)

    const student = await updateStudentService.execute(
      id,
      name,
      email,
      RA,
      CPF
    )

    return response.status(201).json({student: instanceToInstance(student)})
  }
}