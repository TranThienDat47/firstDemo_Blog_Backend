import { Request, Response } from 'express';
import UserService from './user.service';
import { CreateUserDTO } from '~/src/dto/users/createUserDTO';
import { UpdateUserDTO } from '~/src/dto/users/updateUserDTO';
import { ResponseData } from '~/src/globals/globalClass';
import { HttpMessage, HttpStatus } from '~/src/globals/globalEnum';
import { LoginUserDTO } from '~/src/dto/users/loginUserDTO';
import AuthService from '~modules/auths/auth.service';

class UserController {
   async login(req: Request, res: Response): Promise<Response> {
      const loginUserDTO: LoginUserDTO = req.body;

      return UserService.login(loginUserDTO)
         .then(async (result) => {
            const responseData = new ResponseData(
               true,
               { user: result, token: await AuthService.generateToken(result) },
               HttpMessage.SUCCESS,
               HttpStatus.SUCCESS,
            );
            return res.status(HttpStatus.SUCCESS).json(responseData);
         })
         .catch((error) => {
            const responseData = new ResponseData(
               false,
               null,
               HttpMessage.UNAUTHORIZED + ` (${(error as Error).message})`,
               HttpStatus.UNAUTHORIZED,
            );
            return res.status(HttpStatus.UNAUTHORIZED).json(responseData);
         });
   }

   async register(req: Request, res: Response): Promise<Response> {
      const createUserDTO: CreateUserDTO = req.body;

      return UserService.createUser(createUserDTO)
         .then((user) => {
            const responseData = new ResponseData(true, user, HttpMessage.CREATED, HttpStatus.CREATED);
            return res.status(HttpStatus.CREATED).json(responseData);
         })
         .catch((error) => {
            const responseData = new ResponseData(
               false,
               null,
               HttpMessage.CONFLICT + ` (${(error as Error).message})`,
               HttpStatus.CONFLICT,
            );
            return res.status(HttpStatus.CONFLICT).json(responseData);
         });
   }

   async findUserByEmail(req: Request, res: Response): Promise<Response> {
      const email: string = req.params.email;

      return UserService.findUserByEmail(email)
         .then((user) => {
            const responseData = new ResponseData(true, user, HttpMessage.SUCCESS, HttpStatus.SUCCESS);
            return res.status(HttpStatus.SUCCESS).json(responseData);
         })
         .catch((error) => {
            const responseData = new ResponseData(
               false,
               null,
               HttpMessage.NOT_FOUND + ` (${(error as Error).message})`,
               HttpStatus.NOT_FOUND,
            );
            return res.status(HttpStatus.NOT_FOUND).json(responseData);
         });
   }

   async findUserById(req: Request, res: Response): Promise<Response> {
      const id: number = parseInt(req.params.id);

      return UserService.findUserById(id)
         .then((user) => {
            const responseData = new ResponseData(true, user, HttpMessage.SUCCESS, HttpStatus.SUCCESS);
            return res.status(HttpStatus.SUCCESS).json(responseData);
         })
         .catch((error) => {
            const responseData = new ResponseData(
               false,
               null,
               HttpMessage.NOT_FOUND + ` (${(error as Error).message})`,
               HttpStatus.NOT_FOUND,
            );
            return res.status(HttpStatus.NOT_FOUND).json(responseData);
         });
   }

   async findUsers(req: Request, res: Response): Promise<Response> {
      const skip: number = parseInt(req.query.skip as string) || 0;
      const limit: number = parseInt(req.query.limit as string) || Number.MAX_SAFE_INTEGER;
      const key: string = (req.query.key as string) || '';
      const sort: 'ASC' | 'DESC' = (req.query.sort as 'ASC' | 'DESC') || 'ASC';

      return UserService.findUsers(skip, limit, key, sort)
         .then((users) => {
            const responseData = new ResponseData(true, users, HttpMessage.SUCCESS, HttpStatus.SUCCESS);
            return res.status(HttpStatus.SUCCESS).json(responseData);
         })
         .catch((error) => {
            const responseData = new ResponseData(
               false,
               null,
               HttpMessage.INTERNAL_SERVER_ERROR + ` (${(error as Error).message})`,
               HttpStatus.INTERNAL_SERVER_ERROR,
            );
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseData);
         });
   }

   async updateUser(req: Request, res: Response): Promise<Response> {
      const id: number = parseInt(req.params.id);
      const updateUserDTO: UpdateUserDTO = req.body;

      return UserService.updateUser(id, updateUserDTO)
         .then((user) => {
            const responseData = new ResponseData(true, user, HttpMessage.SUCCESS, HttpStatus.SUCCESS);
            return res.status(HttpStatus.SUCCESS).json(responseData);
         })
         .catch((error) => {
            const responseData = new ResponseData(
               false,
               null,
               HttpMessage.NOT_FOUND + ` (${(error as Error).message})`,
               HttpStatus.NOT_FOUND,
            );
            return res.status(HttpStatus.NOT_FOUND).json(responseData);
         });
   }

   async deleteUser(req: Request, res: Response): Promise<Response> {
      const id: number = parseInt(req.params.id);

      return UserService.deleteUser(id)
         .then((result) => {
            const responseData = new ResponseData(true, result, HttpMessage.NO_CONTENT, HttpStatus.NO_CONTENT);
            return res.json(responseData);
         })
         .catch((error) => {
            const responseData = new ResponseData(
               false,
               null,
               HttpMessage.NOT_FOUND + ` (${(error as Error).message})`,
               HttpStatus.NOT_FOUND,
            );
            return res.status(HttpStatus.NOT_FOUND).json(responseData);
         });
   }
}

export default new UserController();
