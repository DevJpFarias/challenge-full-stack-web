import { CreateUserService } from "./CreateUserService"
import { FakeUsersRepository } from "../repository/FakeUsersRepository"

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService

describe('Create User Test', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUserService = new CreateUserService(fakeUsersRepository)
  })

  it('Should be able to create a new user with FakeUsersRepository', async () => {
    const data = {
      name: 'João Paulo',
      email: 'joaopaulo@mail.com',
      RA: 12345,
      CPF: '999.999.999-99'
    }

    const user = await createUserService.execute(data)

    expect(user).toHaveProperty('id')
  })
})