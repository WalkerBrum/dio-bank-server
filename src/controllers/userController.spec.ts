import { Request } from 'express';

import { makeMockResponse } from '../__mocks__/mockResponse.mock';
import { UserService } from '../services/userServices';
import { UserController } from './UserController';

describe('UserController', () => {
  const mockUserService: Partial<UserService> = {
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    deleteUser: jest.fn()
  };

  const userController = new UserController(mockUserService as UserService);

  it('Deve adicionar um novo usuário', () => {
    const mockRequest = { 
      body: {
        name: 'Walker',
        email: 'walker.b.lobato@gmail.com'
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
        email: 'walker.b.lobato@gmail.com'
      } 
    } as Request;
    const mockResponse = makeMockResponse();

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Name é obrigatório'
    });
  })

  it('Deve retornar um erro caso não informe email ao criar usuário', () => {
    const mockRequest = { 
      body: {
        name: 'Walker',
        email: ''
      } 
    } as Request;
    const mockResponse = makeMockResponse();

    userController.createUser(mockRequest, mockResponse);

    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Email é obrigatório'
    });
  })

  it('Deve retornar todos os usuários', () => {
    const mockRequest = {} as Request;
    const mockResponse = makeMockResponse();

    const response = userController.getAllUsers(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.json()).toMatchObject(response);
  })

  it('Deve retornar um erro caso não informe email ao deletar usuário', () => {
    const mockRequest = { 
      body: {
        name: '',
      } 
    } as Request;
    const mockResponse = makeMockResponse();

    userController.deleteUser(mockRequest, mockResponse);

    expect(mockResponse.state.json).toMatchObject({
      message: 'Bad request! Email é obrigatório'
    });
  })

  it('Deve deletar um usuário', () => {
    const mockRequest = { 
      body: {
        email: 'walker.b.lobato@gmail.com'
      } 
    } as Request;
    const mockResponse = makeMockResponse();

    userController.deleteUser(mockRequest, mockResponse);

    expect(mockResponse.state.status).toBe(200);
    expect(mockResponse.state.json).toMatchObject({
      message: 'Usuário deletado'
    });
  })
})