import { Student } from "../../entity/Student";
import { ICreateStudentDTO } from "../../dto/ICreateStudentDTO";
import { IStudentsRepository } from "../../repository/IStudentsRepository";
import { StudentsRepository } from "../../repository/StudentsRepository";
import { AppError } from "../../../AppError";

export class CreateStudentService {
  private studentsRepository: IStudentsRepository

  constructor(repository: IStudentsRepository) {
    this.studentsRepository = repository
    if(!repository) {
      this.studentsRepository = new StudentsRepository()
    }
  }

  async execute({
    name,
    email,
    RA,
    CPF
  }: ICreateStudentDTO): Promise<Student> {
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