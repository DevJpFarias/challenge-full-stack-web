import { Request, Response } from "express";
import { StudentsRepository } from "../../../../student/infra/typeorm/repositories/StudentsRepository";
import { CreateUserService } from '../../../service/createUser/CreateUserService'
import { UsersRepository } from "../../typeorm/repositories/UsersRepository";

const usersRepository = new  UsersRepository()
const studentsRepository = new StudentsRepository()

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUserService = new CreateUserService(usersRepository, studentsRepository)

    const user = await createUserService.execute({
      name,
      email,
      password
    })

    return response.status(201).json(user)
  }
}