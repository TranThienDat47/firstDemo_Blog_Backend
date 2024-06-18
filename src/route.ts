import userRouter from './modules/users';

export default (app: any) => {
   //user
   app.use('/api/user', userRouter);

   //admin
};
