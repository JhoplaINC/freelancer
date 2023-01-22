import {Router} from 'express';
import { getPosts, getPost, onCreateNewPost, onCreateNewComment } from '../controllers/postController.js'

const router = Router();

router.get('/posts', getPosts);

router.get('/post/:user/:id', getPost);

router.post('/newpost', onCreateNewPost);

router.post('/add-comment', onCreateNewComment);

export default router;