import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class CreateUserService {
  private usersRepository: IUsersRepository

  constructor(repository) {
    this.usersRepository = repository

    if(!repository) {
      this.usersRepository = new UsersRepository()
    }
  }

  async execute({ name, email, password }: ICreateUserDTO) {
    const user = await this.usersRepository.create({
      name,
      email,
      password
    })

    return user
  }
}