import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AppDataSource } from '~/configs/db/ormconfig';
import { User } from '~/entites/user.entity';
import { CreateUserDTO } from '~/dto/users/createUserDTO';
import { UpdateUserDTO } from '~/dto/users/updateUserDTO';
import { LoginUserDTO } from '~/dto/users/loginUserDTO';

class UserService {
   private userRepository: Repository<User>;

   constructor() {
      this.userRepository = AppDataSource.getRepository(User);
   }

   async login(loginUserDTO: LoginUserDTO): Promise<User | null> {
      return this.userRepository
         .findOneBy({ email: loginUserDTO.email })
         .then(async (user) => {
            if (!user) {
               return Promise.reject(new Error('User not found'));
            }

            return bcrypt.compare(loginUserDTO.password, user.password).then((isPasswordValid) => {
               if (!isPasswordValid) {
                  return Promise.reject(new Error('Invalid password'));
               }

               return user;
            });
         })
         .catch((error) => {
            throw error;
         });
   }

   async create(createUserDTO: CreateUserDTO): Promise<User> {
      return this.userRepository
         .findOneBy({ email: createUserDTO.email })
         .then(async (existingUser) => {
            if (existingUser) {
               return Promise.reject(new Error('Email already exists'));
            }

            const saltRounds = 10;
            return bcrypt.hash(createUserDTO.password, saltRounds).then((hashedPassword) => {
               const user = this.userRepository.create({ ...createUserDTO, password: hashedPassword });
               return this.userRepository.save(user);
            });
         })
         .catch((error) => {
            throw error;
         });
   }

   findByEmail(email: string): Promise<User | null> {
      return this.userRepository.findOneBy({ email });
   }

   findById(_id: number): Promise<User | null> {
      return this.userRepository.findOneBy({ _id });
   }

   async finds(
      skip: number = 0,
      limit: number = 10,
      key: string = '',
      sort: 'ASC' | 'DESC' = 'ASC',
   ): Promise<User[] | null> {
      const query = this.userRepository
         .createQueryBuilder('user')
         .where('user.firstName LIKE :key OR user.lastName LIKE :key OR user.email LIKE :key', { key: `%${key}%` })
         .orderBy('user.createdAt', sort)
         .skip(skip)
         .take(limit);

      return query.getMany();
   }

   async update(_id: number, updateUserDTO: UpdateUserDTO): Promise<User | null> {
      if (updateUserDTO.password) {
         return bcrypt
            .hash(updateUserDTO.password, 10)
            .then((hashedPassword) => {
               updateUserDTO.password = hashedPassword;
               return this.userRepository.update(_id, updateUserDTO).then((result) => {
                  if (result.affected === 0) {
                     throw new Error(`Failed to update user: No user found with id ${_id}`);
                  }
                  return this.userRepository.findOneBy({ _id });
               });
            })
            .then((updatedUser) => {
               if (!updatedUser) {
                  throw new Error(`User with id ${_id} not found`);
               }
               return updatedUser;
            })
            .catch((error) => {
               throw new Error(`Failed to update user: ${error.message}`);
            });
      } else {
         return this.userRepository
            .update(_id, updateUserDTO)
            .then((result) => {
               if (result.affected === 0) {
                  throw new Error(`Failed to update user: No user found with id ${_id}`);
               }
               return this.userRepository.findOneBy({ _id });
            })
            .then((updatedUser) => {
               if (!updatedUser) {
                  throw new Error(`User with id ${_id} not found`);
               }
               return updatedUser;
            })
            .catch((error) => {
               throw new Error(`Failed to update user: ${error.message}`);
            });
      }
   }

   async delete(_id: number): Promise<Boolean> {
      return this.userRepository
         .delete(_id)
         .then((result) => result.affected > 0)
         .catch(() => false);
   }
}

export default new UserService();
