import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/connections/data-source";
import { User } from "../entity/User";
import { ICreateUserDTO } from "../../../dto/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User)
  }

  async create({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password
    })

    await this.ormRepository.save(user)

    return user
  }

  async findById(id: string): Promise<User> {
    return this.ormRepository.findOne({
      where: {
        id,
        inactivated: false
      }
    })
  }

  async findByEmail(email: string): Promise<User> {
    return this.ormRepository.findOne({
      where: {
        email,
        inactivated: false
      }
    })
  }
}