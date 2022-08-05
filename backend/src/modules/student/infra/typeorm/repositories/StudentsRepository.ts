import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../shared/connections/data-source";
import { Student } from "../entity/Student";
import { ICreateStudentDTO } from "../../../dto/ICreateStudentDTO";
import { IStudentsRepository } from "../../../repositories/IStudentsRepository";

export class StudentsRepository implements IStudentsRepository {
  private ormRepository: Repository<Student>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Student)
  }

  async create({ name, email, RA, CPF }: ICreateStudentDTO): Promise<Student> {
    const student = this.ormRepository.create({
      name,
      email,
      RA,
      CPF
    })

    await this.ormRepository.save(student)

    return student
  }

  async findByEmail(email: string): Promise<Student> {
    const student = await this.ormRepository.findOne({
      where: {
        email
      }
    })

    return student
  }

  async findByRA(RA: number): Promise<Student> {
    const student = await this.ormRepository.findOne({
      where: {
        RA
      }
    })

    return student
  }

  async findByCPF(CPF: string): Promise<Student> {
    const student = await this.ormRepository.findOne({
      where: {
        CPF
      }
    })

    return student
  }

  async listAll(): Promise<Student[]> {
    const students = await this.ormRepository.find({
      where: {
        inactivated: false
      }
    })

    return students
  }

  async update(student: Student): Promise<Student> {
    await this.ormRepository.save(student)

    return student
  }

  async findById(id: string): Promise<Student> {
    const student = await this.ormRepository.findOne({
      where: {
        id
      }
    })

    return student
  }

  async inactivate(student: Student): Promise<void> {
    student.inactivated = true

    await this.ormRepository.save(student)
  }
}