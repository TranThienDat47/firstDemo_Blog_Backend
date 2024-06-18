import postRouter from '~modules/posts';
import userRouter from '~modules/users';

export default (app: any) => {
   //user
   app.use('/api/user', userRouter);
   app.use('/api/post', postRouter);

   //admin
};
