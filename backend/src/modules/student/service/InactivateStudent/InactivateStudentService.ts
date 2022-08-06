import { Student } from "../../infra/typeorm/entity/Student";
import { IStudentsRepository } from "../../repositories/IStudentsRepository";
import { StudentsRepository } from "../../infra/typeorm/repositories/StudentsRepository";

export class InactivateStudentService {
  private studentsRepository: IStudentsRepository

  constructor (repository: IStudentsRepository) {
    this.studentsRepository = repository
    if(!repository) this.studentsRepository = new StudentsRepository()
  }

  async execute(id: string): Promise<void> {
    const student = await this.studentsRepository.findById(id)

    await this.studentsRepository.inactivate(student)
  }
}