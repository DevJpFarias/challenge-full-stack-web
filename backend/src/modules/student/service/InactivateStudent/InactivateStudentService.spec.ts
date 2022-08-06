import { FakeStudentsRepository } from "../../repositories/fakes/FakeStudentsRepository"
import { CreateStudentService } from "../CreateStudent/CreateStudentService"
import { InactivateStudentService } from "./InactivateStudentService"

let fakeStudentsRepository: FakeStudentsRepository
let createStudentsService: CreateStudentService
let inactivateStudentService: InactivateStudentService

describe('Inactivate Student Test', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository()
    createStudentsService = new CreateStudentService(fakeStudentsRepository)
    inactivateStudentService = new InactivateStudentService(fakeStudentsRepository)
  })

  it('Should be able to inactivate a student', async () => {
    const data = {
      name: 'Fulano',
      email: 'fulano@mail.com',
      RA: 99999999,
      CPF: '000.000.000-00'
    }

    const student = await createStudentsService.execute(data)

    await inactivateStudentService.execute(student.id)

    expect(student).toHaveProperty('inactivated', true)
  })
})