import { AppError } from "../../../../shared/errors/AppError"
import { FakeStudentsRepository } from "../../../student/repositories/fakes/FakeStudentsRepository"
import { FakeUsersRepository } from "../../repositories/fakes/FakeUsersRepository"
import { CreateUserService } from "../createUser/CreateUserService"
import { AuthenticateUserService } from "./AuthenticateUserService"

let fakeUsersRepository: FakeUsersRepository
let fakeStudentsRepository: FakeStudentsRepository
let createUserService: CreateUserService
let authenticateUserService: AuthenticateUserService

describe('Authenticate User Test', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStudentsRepository = new FakeStudentsRepository()
    createUserService = new CreateUserService(fakeUsersRepository, fakeStudentsRepository)
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository)
  })

  it('Should not be able to do login with nonexistent email', async () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: 'fulano@mail.com',
        password: '12345'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should not be able to do login with wrong password', async () => {
    expect(async () => {
      await createUserService.execute({
        name: 'Fulano',
        email: 'fulano@mail.com',
        password: '12345'
      })

      await authenticateUserService.execute({
        email: 'fulano@mail.com',
        password: '54321'
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})