import express from 'express';
import authMiddleware from '~/middleware/auth.middleware';
import postController from './post.controller';

const postRouter = express.Router();

postRouter.get('/search', postController.findPosts);

postRouter.get('/:_id', postController.getById);

postRouter.post('/create', postController.create);

postRouter.put('/:_id', postController.update);

postRouter.delete('/:_id', postController.delete);

export default postRouter;
