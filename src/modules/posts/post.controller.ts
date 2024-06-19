import { Request, Response } from 'express';
import { CreatePostDTO } from '~/dto/posts/createPost.dto';
import { UpdatePostDTO } from '~/dto/posts/updatePost.dto';
import { ResponseData } from '~/globals/globalClass';
import { HttpMessage, HttpStatus } from '~/globals/globalEnum';
import PostService from './post.service';
import { plainToClass } from 'class-transformer';
import { validator } from '~/globals/validate';

class PostController {
   async getById(req: Request, res: Response): Promise<Response> {
      const _id: number = parseInt(req.params._id);

      return PostService.getByID(_id)
         .then((post) => {
            const responseData = new ResponseData(true, post, HttpMessage.SUCCESS, HttpStatus.SUCCESS);

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

   async findPosts(req: Request, res: Response): Promise<Response> {
      const skip: number = parseInt(req.query.skip as string) || 0;
      const limit: number = parseInt(req.query.limit as string) || 10;
      const key: string = (req.query.key as string) || '';
      const sort: 'ASC' | 'DESC' = (req.query.sort as 'ASC' | 'DESC') || 'ASC';

      return PostService.findPosts(skip, limit, key, sort)
         .then((posts) => {
            const responseData = new ResponseData(true, posts, HttpMessage.SUCCESS, HttpStatus.SUCCESS);
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

   async create(req: Request, res: Response): Promise<Response> {
      const createPostDTO: CreatePostDTO = plainToClass(CreatePostDTO, req.body);

      const validatorCheck = await validator(createPostDTO);
      if (!validatorCheck.success) {
         return res.status(validatorCheck.status).json(validatorCheck.responseData);
      }

      return PostService.create(createPostDTO)
         .then((post) => {
            const responseData = new ResponseData(true, post, HttpMessage.CREATED, HttpStatus.CREATED);
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

   async update(req: Request, res: Response): Promise<Response> {
      const _id: number = parseInt(req.params._id);

      const updatePostDTO: UpdatePostDTO = plainToClass(UpdatePostDTO, req.body);

      const validatorCheck = await validator(updatePostDTO);
      if (!validatorCheck.success) {
         return res.status(validatorCheck.status).json(validatorCheck.responseData);
      }

      return PostService.update(_id, updatePostDTO)
         .then((post) => {
            const responseData = new ResponseData(true, post, HttpMessage.SUCCESS, HttpStatus.SUCCESS);
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

   async delete(req: Request, res: Response): Promise<Response> {
      const _id: number = parseInt(req.params._id);

      return PostService.delete(_id)
         .then((result) => {
            const responseData = new ResponseData(
               true,
               result,
               result ? HttpMessage.SUCCESS : HttpMessage.NOT_FOUND,
               result ? HttpStatus.SUCCESS : HttpStatus.NOT_FOUND,
            );
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

export default new PostController();
