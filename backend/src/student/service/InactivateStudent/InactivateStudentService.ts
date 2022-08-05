import { Student } from "../../entity/Student";
import { IStudentsRepository } from "../../repository/IStudentsRepository";
import { StudentsRepository } from "../../repository/StudentsRepository";

export class InactivateStudentService {
  private studentsRepository: IStudentsRepository

  constructor (repository: IStudentsRepository) {
    this.studentsRepository = repository
    if(!repository) {
      this.studentsRepository = new StudentsRepository()
    }
  }

  async execute(id: string): Promise<void> {
    const student = await this.studentsRepository.findById(id)

    await this.studentsRepository.inactivate(student)
  }
}