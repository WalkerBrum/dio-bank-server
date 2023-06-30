import { Request } from 'express';

import { UserController } from './UserController';
import { makeMockResponse } from '../__mocks__/mockResponse.mock';
import { makeMockRequest } from '../__mocks__/mockRequest.mock';

const mockUserService = {
  createUser: jest.fn(),
  getUser: jest.fn()
}

jest.mock('../services/UserServices', () => {
  return {
    UserService: jest.fn().mockImplementation(() => {
      return mockUserService
    })
  }
})

describe('UserController', () => {
  const mockResponse = makeMockResponse();
  const userController = new UserController();

  it('Deve adicionar um novo usuário', () => {
    const mockRequest = { 
      body: {
        name: 'Walker',
        email: 'walker.b.lobato@gmail.com',
        password: '123456'
      } 
    } as Request;
    const mockResponse = makeMockResponse();

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(201);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Usuário criado'
    });
  })

  it('Deve retornar um erro caso não informe name ao criar usuário', () => {
    const mockRequest = { 
      body: {
        name: '',
        email: 'walker.b.lobato@gmail.com',
        password: '123456'
      } 
    } as Request;

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Name é obrigatório'
    });
  })

  it('Deve retornar um erro caso não informe email ao criar usuário', () => {
    const mockRequest = { 
      body: {
        name: 'Walker',
        email: '',
        password: '123456'
      } 
    } as Request;

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Email é obrigatório'
    });
  })

  it('Deve retornar um erro caso não informe password ao criar usuário', () => {
    const mockRequest = { 
      body: {
        name: 'Walker',
        email: 'walker.b.lobato@gmail.com',
        password: ''
      } 
    } as Request;

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(400)
    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Password é obrigatório'
    });
  })

  it('Deve retornar o usuário com o userId informado', () => {
    const mockRequest = makeMockRequest({
      params: {
        userId: '123456'
      }
    })

    userController.getUser(mockRequest, mockResponse)
    expect(mockUserService.getUser).toHaveBeenCalledWith('123456')
    expect(mockResponse.state.status).toBe(200)
  })
})