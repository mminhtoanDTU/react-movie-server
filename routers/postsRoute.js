import express from 'express';
import { getPosts, getUserPosts, createPost, updatePost, deletePost } from '../controllers/postsController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', getPosts);

router.get('/:userId', getUserPosts);

router.post('/', verifyToken, createPost);

router.put('/:postId', verifyToken, updatePost);

router.delete('/:postId', verifyToken, deletePost);

export default router;