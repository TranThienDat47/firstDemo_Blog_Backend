import { sign, verify } from 'jsonwebtoken';
import { User } from '~/entites/user.entity';
import UserService from '~modules/users/user.service';

class AuthService {
   private readonly JWT_SECRET: string = process.env.JWT_SECRET;

   async generateToken(user: User): Promise<string> {
      const token = sign({ _id: user._id }, this.JWT_SECRET, {});
      return token;
   }

   async verifyToken(token: string): Promise<User | null> {
      return new Promise((resolve, reject) => {
         verify(token, this.JWT_SECRET, (err, decoded: any) => {
            if (err) {
               return reject(err);
            }
            const userId = decoded._id;
            UserService.findById(userId)
               .then((user) => resolve(user))
               .catch((err) => reject(err));
         });
      });
   }
}

export default new AuthService();
