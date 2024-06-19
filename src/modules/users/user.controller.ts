import { Request, Response } from 'express';
import UserService from './user.service';
import { CreateUserDTO } from '~/dto/users/createUserDTO';
import { UpdateUserDTO } from '~/dto/users/updateUserDTO';
import { ResponseData } from '~/globals/globalClass';
import { HttpMessage, HttpStatus } from '~/globals/globalEnum';
import { LoginUserDTO } from '~/dto/users/loginUserDTO';
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

      return UserService.create(createUserDTO)
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

      return UserService.findByEmail(email)
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
      const _id: number = parseInt(req.params._id);

      return UserService.findById(_id)
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

      return UserService.finds(skip, limit, key, sort)
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
      const _id: number = parseInt(req.params._id);
      const updateUserDTO: UpdateUserDTO = req.body;

      return UserService.update(_id, updateUserDTO)
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
      const _id: number = parseInt(req.params._id);

      return UserService.delete(_id)
         .then((result) => {
            const responseData = new ResponseData(
               true,
               result,
               result ? HttpMessage.SUCCESS : HttpMessage.NOT_FOUND,
               result ? HttpStatus.SUCCESS : HttpStatus.NOT_FOUND,
            );
            return res.status(result ? HttpStatus.SUCCESS : HttpStatus.NOT_FOUND).json(responseData);
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
