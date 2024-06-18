import express from 'express';
import userController from './user.controller';
import authMiddleware from '~/src/middleware/auth.middleware';

const userRouter = express.Router();

userRouter.get('/find', authMiddleware, userController.findUsers);

userRouter.post('/login', userController.login);

userRouter.post('/register', userController.register);

userRouter.put('/:id', authMiddleware, userController.updateUser);

userRouter.delete('/:id', authMiddleware, userController.deleteUser);

export default userRouter;
