import { User } from "../entity/User";
import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { IUsersRepository } from "../repository/IUsersRepository";
import { UsersRepository } from "../repository/UsersRepository";

export class CreateUserService {
  private usersRepository: IUsersRepository

  constructor(repository: IUsersRepository) {
    this.usersRepository = repository
    if(!repository) {
      this.usersRepository = new UsersRepository()
    }
  }

  async execute({
    name,
    email,
    RA,
    CPF
  }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      email,
      RA,
      CPF
    })

    return user
  }
}