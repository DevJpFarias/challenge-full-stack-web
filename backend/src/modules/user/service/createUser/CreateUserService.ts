import { AppError } from "../../../../shared/errors/AppError";
import { StudentsRepository } from "../../../student/infra/typeorm/repositories/StudentsRepository";
import { IStudentsRepository } from "../../../student/repositories/IStudentsRepository";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";

export class CreateUserService {
  private usersRepository: IUsersRepository
  private studentsRepository: IStudentsRepository

  constructor(
    usersRepository: IUsersRepository,
    studentsRepository: IStudentsRepository
    ) {
    this.usersRepository = usersRepository
    this.studentsRepository = studentsRepository

    if(!usersRepository) this.usersRepository = new UsersRepository()

    if(!studentsRepository) this.studentsRepository = new StudentsRepository()
  }

  async execute({ name, email, password }: ICreateUserDTO) {
    const findStudent = await this.studentsRepository.findByEmail(email)

    if(findStudent) throw new AppError('This email is already used!')
    
    const findUser = await this.usersRepository.findByEmail(email)

    if(findUser) throw new AppError('This email is already used!')

    const user = await this.usersRepository.create({
      name,
      email,
      password
    })

    return user
  }
}