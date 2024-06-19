import { Repository, UpdateResult } from 'typeorm';
import { AppDataSource } from '~/configs/db/ormconfig';
import { CreatePostDTO } from '~/dto/posts/createPost.dto';
import { UpdatePostDTO } from '~/dto/posts/updatePost.dto';
import { Post } from '~/entites/post.entity';
import { User } from '~/entites/user.entity';

class PostService {
   private postRepository: Repository<Post>;
   private userRepository: Repository<User>;

   constructor() {
      this.postRepository = AppDataSource.getRepository(Post);
      this.userRepository = AppDataSource.getRepository(User);
   }

   async getByID(_id: number): Promise<Post> {
      return this.postRepository.findOneBy({ _id });
   }

   async findPosts(
      skip: number = 0,
      limit: number = 10,
      key: string = '',
      sort: 'ASC' | 'DESC' = 'ASC',
   ): Promise<Post[] | null> {
      const query = this.postRepository
         .createQueryBuilder('post')
         .where('post.keySearch LIKE :key', { key: `%${key}%` })
         .orderBy('post.createdAt', sort)
         .skip(skip)
         .take(limit);

      return query.getMany();
   }

   async create(createPostDTO: CreatePostDTO): Promise<Post | null> {
      const { userID, ...postData } = createPostDTO;

      try {
         if (typeof userID !== 'number') {
            throw new Error(`userID must be a number, but received ${typeof userID}`);
         }

         const user = await this.userRepository.findOneOrFail({
            where: {
               _id: userID,
            },
         });

         const newPost = this.postRepository.create({
            ...postData,
            user,
         });

         return await this.postRepository.save(newPost);
      } catch (error) {
         throw new Error(`Failed to create post: ${(error as Error).message}`);
      }
   }

   async update(_id: number, updatePostDTO: UpdatePostDTO): Promise<Post> {
      return this.postRepository
         .update(_id, updatePostDTO)
         .then((result: UpdateResult) => {
            if (result.affected === 0) {
               throw new Error(`Failed to update post: No post found with id ${_id}`);
            }
            return this.postRepository.findOneBy({ _id });
         })
         .then((updatedPost) => {
            if (!updatedPost) {
               throw new Error(`Post with id ${_id} not found`);
            }
            return updatedPost;
         })
         .catch((error) => {
            throw new Error(`Failed to update post: ${error.message}`);
         });
   }

   async delete(_id: number): Promise<Boolean> {
      return this.postRepository
         .delete(_id)
         .then((result) => result.affected > 0)
         .catch(() => false);
   }
}

export default new PostService();
