import { User, UserService } from "./userServices"

describe('UseService', () => {
  const mockDb: User[] = []
  const userService = new UserService(mockDb);

  it('Deve adicionar um novo usuário', () => {
    const mockConsole = jest.spyOn(global.console, 'log');
    userService.createUser('Walker', 'walker.b.lobato@gmail.com');
    expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb);
  })
})