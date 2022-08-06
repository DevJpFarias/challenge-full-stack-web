import { Student } from "../../infra/typeorm/entity/Student";
import { ICreateStudentDTO } from "../../dto/ICreateStudentDTO";
import { IStudentsRepository } from "../../repositories/IStudentsRepository";
import { StudentsRepository } from "../../infra/typeorm/repositories/StudentsRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../user/repositories/IUsersRepository";
import { UsersRepository } from "../../../user/infra/typeorm/repositories/UsersRepository";

export class CreateStudentService {
  private studentsRepository: IStudentsRepository
  private usersRepository: IUsersRepository

  constructor(studentsRepository: IStudentsRepository, usersRepository: IUsersRepository) {
    this.studentsRepository = studentsRepository
    this.usersRepository = usersRepository
    
    if(!studentsRepository) this.studentsRepository = new StudentsRepository()

    if (!usersRepository) this.usersRepository = new UsersRepository()
  }

  async execute({
    name,
    email,
    RA,
    CPF
  }: ICreateStudentDTO): Promise<Student> {
    const findUserByEmail = await this.usersRepository.findByEmail(email)

    if(findUserByEmail) throw new AppError('This email is already used')

    const findStudentByEmail = await this.studentsRepository.findByEmail(email)

    if(findStudentByEmail) throw new AppError('This email is already used')

    const findStudentByRA = await this.studentsRepository.findByRA(RA)

    if(findStudentByRA) throw new AppError('This RA already exists')

    const findStudentByCPF = await this.studentsRepository.findByCPF(CPF)

    if(findStudentByCPF) throw new AppError('This CPF is already used')

    const student = await this.studentsRepository.create({
      name,
      email,
      RA,
      CPF
    })

    return student
  }
}