import { AppError } from "../../../../shared/errors/AppError"
import { FakeStudentsRepository } from "../../../student/repositories/fakes/FakeStudentsRepository"
import { CreateStudentService } from "../../../student/service/CreateStudent/CreateStudentService"
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository"
import { CreateUserService } from "./CreateUserService"

let fakeUsersRepository: FakeUsersRepository
let fakeStudentsRepository: FakeStudentsRepository
let createUserService: CreateUserService
let createStudentsService: CreateStudentService

describe('Create User Test', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStudentsRepository = new FakeStudentsRepository()
    createUserService = new CreateUserService(fakeUsersRepository, fakeStudentsRepository)
    createStudentsService = new CreateStudentService(fakeStudentsRepository)
  })

  it('Should be able to create a new user', async () => {
    const data = {
      name: 'Fulano',
      email: 'fulano@mail.com',
      password: 'fulaninho'
    }

    const user = await createUserService.execute(data)

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('isAdmin', false)
    expect(user).toHaveProperty('inactivated', false)
  })

  it('Should not be able to create an user with an existent email', async () => {
    expect(async () => {
      const data = {
        name: 'Fulano',
        email: 'fulano@mail.com',
        password: '12345'
      }
      const second_data = {
        name: 'Fulano',
        email: 'fulano@mail.com',
        password: '12345'
      }
  
      await createUserService.execute(data)
      await createUserService.execute(second_data)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to create an user with an existent email (student)', () => {
    expect(async () => {
      const student_data = {
        name: 'João Paulo',
        email: 'joaopaulo@mail.com',
        RA: 12345,
        CPF: '999.999.999-99'
      }
      const user_data = {
        name: 'Fulano',
        email: 'joaopaulo@mail.com',
        password: '12345'
      }
  
      await createStudentsService.execute(student_data)
      await createUserService.execute(user_data)
    }).rejects.toBeInstanceOf(AppError)
  })
})