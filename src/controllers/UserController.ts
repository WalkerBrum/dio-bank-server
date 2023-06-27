import  { Request, Response } from 'express';
import { UserService } from '../services/userServices';

export class UserController {
  userService: UserService;

  constructor (userService = new UserService()) {
    this.userService = userService;
  }

  createUser = (req: Request, res: Response) => {
    const user = req.body;

    if(!user.name) {
      return res.status(400).json({
        message: 'Bad request! Name é obrigatório'
      })
    }

    if(!user.email) {
      return res.status(400).json({
        message: 'Bad request! Email é obrigatório'
      })
    }

    this.userService.createUser(user.name, user.email);
  
    return res.status(201).json({
      message: 'Usuário criado'
    })
  }

  getAllUsers = (req: Request, res: Response) => {
    const users = this.userService.getAllUsers();

    return res.status(200).json(users);
  }

  deleteUser = (req: Request, res: Response) => {
    const user = req.body;

    if(!user.email) {
      return res.status(400).json({
        message: 'Bad request! Email é obrigatório'
      })
    }

    this.userService.deleteUser(user.email);

    return res.status(200).json({
      message: 'Usuário deletado'
    })
  }
}