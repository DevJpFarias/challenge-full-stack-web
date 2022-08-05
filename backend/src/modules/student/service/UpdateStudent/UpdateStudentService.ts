import { AppError } from "../../../../shared/erros/AppError";
import { Student } from "../../infra/typeorm/entity/Student";
import { IStudentsRepository } from "../../repositories/IStudentsRepository";
import { StudentsRepository } from "../../infra/typeorm/repositories/StudentsRepository";

export class UpdateStudentService {
  private studentsRepository: IStudentsRepository

  constructor(repository: IStudentsRepository) {
    this.studentsRepository = repository
    
    if(!repository) {
      this.studentsRepository = new StudentsRepository()
    }
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
      const findByEmail = await this.studentsRepository.findByEmail(email)

      if(findByEmail) throw new AppError('This email is not available!')
    }

    student.name = name
    student.email = email

    await this.studentsRepository.update(student)

    return student
  }
}