import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../entity/User";
import { ICreateUserDTO } from "../dto/ICreateUserDTO";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User)
  }

  async create({ name, email, RA, CPF }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      RA,
      CPF
    })

    await this.ormRepository.save(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({
      where: {
        email
      }
    })

    return user
  }
}