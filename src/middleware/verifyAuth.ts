import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if(authToken) {
    const [, token] = authToken.split(' ');

    try {
      const { sub } = verify(token, '123456789');
      console.log('oTkoen for user', sub);
      return next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized'});
    }
  }

  return res.status(401).json({ message: 'Unauthorized'})
}