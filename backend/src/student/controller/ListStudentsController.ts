import { Request, Response } from "express";
import { StudentsRepository } from "../repository/StudentsRepository";
import { ListStudentsService } from "../service/ListStudents/ListStudentsService";

const studentsRepository = new StudentsRepository()

export class ListStudentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listStudentsService = new ListStudentsService(studentsRepository)

    const students = await listStudentsService.execute()

    return response.status(200).json(students)
  }
}