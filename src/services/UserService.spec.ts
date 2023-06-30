import { UserService } from './UserServices'
import * as jwt from 'jsonwebtoken'

jest.mock('../repositories/UserRepository')
jest.mock('../database', () => {
  return {
    initialize: jest.fn()
  }
})
jest.mock('jsonwebtoken')

const mockUserRepository = require('../repositories/UserRepository')

describe('UseService', () => {
  const userService = new UserService(mockUserRepository);

  const mockUser = {
    id_user: '123456',
      name: 'walk',
      email: 'walker.b.lobato@gmail.com',
      password: '123456'
  };

  it('Deve adicionar um novo usuário', async () => {
    mockUserRepository.createUser = jest.fn().mockImplementation(() => Promise.resolve(mockUser))

    const response = await userService.createUser('Walker', 'walker.b.lobato@gmail.com', '123456')
    
    expect(mockUserRepository.createUser).toHaveBeenCalled()
    expect(response).toMatchObject({
      id_user: '123456',
      name: 'walk',
      email: 'walker.b.lobato@gmail.com',
      password: '123456'
    })
  })

  it('Devo retornar um token de usuário', async () => {
    jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(mockUser))
    jest.spyOn(jwt, 'sign').mockImplementation(() => 'token')
    const token = await userService.getToken('walker.b.lobato@gmail.com', '123456')

    expect(token).toBe('token')
  })

  it('Deve retornar um erro, caso não encontre um usuário', async () => {
    jest.spyOn(userService, 'getAuthenticatedUser').mockImplementation(() => Promise.resolve(null))
    await expect(userService.getToken('invalid@test.com', '123456')).rejects.toThrowError(new Error('Email/password invalid!'))
  })
})