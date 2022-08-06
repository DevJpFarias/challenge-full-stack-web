import { Request, Response } from "express";
import { StudentsRepository } from "../../typeorm/repositories/StudentsRepository";
import { CreateStudentService } from "../../../service/CreateStudent/CreateStudentService";
import { UsersRepository } from "../../../../user/infra/typeorm/repositories/UsersRepository";

const studentsRepository = new StudentsRepository()
const usersRepository = new UsersRepository()

export class CreateStudentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, RA, CPF } = request.body

    const createStudentService = new CreateStudentService(studentsRepository, usersRepository)

    const student = await createStudentService.execute({
      name,
      email,
      RA,
      CPF
    })

    return response.status(201).json(student)
  }
}