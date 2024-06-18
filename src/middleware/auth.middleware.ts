import { NextFunction, Request, Response } from 'express';
import AuthService from '~modules/auths/auth.service';

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
   const token = req.headers.authorization?.split(' ')[1];

   if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
   }

   try {
      const user = await AuthService.verifyToken(token);

      if (!user) {
         return res.status(401).json({ success: false, message: 'Invalid token' });
      }

      (req as any).user = user;
      next();
   } catch (err) {
      console.error('Error verifying token:', err);
      return res.status(401).json({ success: false, message: 'Invalid token' });
   }
};

export default AuthMiddleware;
