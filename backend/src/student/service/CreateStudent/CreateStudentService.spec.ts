import { CreateStudentService } from "./CreateStudentService"
import { FakeStudentsRepository } from "../../repository/FakeStudentsRepository"
import { AppError } from "../../../AppError"

let fakeStudentsRepository: FakeStudentsRepository
let createStudentsService: CreateStudentService

describe('Create Student Test', () => {
  beforeEach(() => {
    fakeStudentsRepository = new FakeStudentsRepository()
    createStudentsService = new CreateStudentService(fakeStudentsRepository)
  })

  it('Should be able to create a new student', async () => {
    const data = {
      name: 'Fulano',
      email: 'fulano@mail.com',
      RA: 99999999,
      CPF: '000.000.000-00'
    }

    const student = await createStudentsService.execute(data)

    expect(student).toHaveProperty('id')
  })

  it('Should not be able to create a new student with an existent email', async () => {
    expect(async () => {
      const first_data = {
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 1234,
        CPF: '999.999.999-99'
      }

      const second_data = {
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 4321,
        CPF: '999.888.999-88'
      }

      await createStudentsService.execute(first_data)
      await createStudentsService.execute(second_data)

    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new student with an existent RA', async () => {
    expect(async () => {
      const first_data = {
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 1234,
        CPF: '999.999.999-99'
      }

      const second_data = {
        name: 'João Paulo',
        email: 'joaopaulo2@mail.com',
        RA: 1234,
        CPF: '999.888.999-88'
      }

      await createStudentsService.execute(first_data)
      await createStudentsService.execute(second_data)

    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create a new student with an existent CPF', async () => {
    expect(async () => {
      const first_data = {
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 1234,
        CPF: '999.999.999-99'
      }

      const second_data = {
        name: 'João Paulo',
        email: 'joaopaulo2@mail.com',
        RA: 4321,
        CPF: '999.999.999-99'
      }

      await createStudentsService.execute(first_data)
      await createStudentsService.execute(second_data)

    }).rejects.toBeInstanceOf(AppError)
  })
})