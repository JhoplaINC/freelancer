import {Router} from 'express';
import { onCreateNewPost, getPosts, getPost } from '../controllers/postController.js'

const router = Router();

router.get('/posts', getPosts);

router.get('/post/:user/:id', getPost);

router.post('/newpost', onCreateNewPost);

export default router;