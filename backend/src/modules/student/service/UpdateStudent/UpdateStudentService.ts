import { AppError } from "../../../../shared/errors/AppError";
import { Student } from "../../infra/typeorm/entity/Student";
import { IStudentsRepository } from "../../repositories/IStudentsRepository";
import { StudentsRepository } from "../../infra/typeorm/repositories/StudentsRepository";
import { IUsersRepository } from "../../../user/repositories/IUsersRepository";
import { UsersRepository } from "../../../user/infra/typeorm/repositories/UsersRepository";

export class UpdateStudentService {
  private studentsRepository: IStudentsRepository
  private usersRepository: IUsersRepository

  constructor(studentsRepository: IStudentsRepository, usersRepository: IUsersRepository) {
    this.studentsRepository = studentsRepository
    this.usersRepository = usersRepository
    
    if(!studentsRepository) this.studentsRepository = new StudentsRepository()

    if(!usersRepository) this.usersRepository = new UsersRepository()
  }

  async execute(
    id: string,
    name: string,
    email: string,
    RA?: number,
    CPF?: string
    ): Promise<Student> {
    const student = await this.studentsRepository.findById(id)

    if(!student) throw new AppError('Student not found!')

    if(RA) throw new AppError('The RA cannot be edited!')

    if(CPF) throw new AppError('The CPF cannot be edited!')

    if(email) {
      const findUserByEmail = await this.usersRepository.findByEmail(email)
      const findStudentByEmail = await this.studentsRepository.findByEmail(email)

      if(findUserByEmail) throw new AppError('This email is not available!')
      if(findStudentByEmail) throw new AppError('This email is not available!')
    }

    student.name = name
    student.email = email

    await this.studentsRepository.update(student)

    return student
  }
}