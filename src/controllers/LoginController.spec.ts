import { Request } from 'express';

import { LoginController } from './LoginController';
import { makeMockResponse } from '../__mocks__/mockResponse.mock';

const mockUserService = {
  login: jest.fn(),
}

jest.mock('../services/UserServices', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService
    })
  }
})

describe('LoginController', () => {
  const mockResponse = makeMockResponse();
  const loginController = new LoginController();

  it('Deve faz o login de um usuário', async () => {
    const mockRequest = { 
      body: {
        email: 'walker.b.lobato@gmail.com',
        password: '123456'
      } 
    } as Request;
    const mockResponse = makeMockResponse();

    await loginController.login(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
  })

  it('Deve retornar um erro caso não informe o password ao fazer login do usuário', async () => {
    const mockRequest = { 
      body: {
        email: 'walker.b.lobato@gmail.com',
        password: ''
      } 
    } as Request;

    await loginController.login(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(500)
    expect(mockResponse.state.json).toMatchObject({
      message: 'Email/password invalid!'
    });
  })

  it('Deve retornar um erro caso não informe o email ao fazer login do usuário', async () => {
    const mockRequest = { 
      body: {
        email: '',
        password: '123456'
      } 
    } as Request;

    await loginController.login(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(500)
    expect(mockResponse.state.json).toMatchObject({
      message: 'Email/password invalid!'
    });
  })
})