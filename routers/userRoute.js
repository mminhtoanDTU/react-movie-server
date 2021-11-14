import express from 'express';
import { getAllUser, getUserWithPosts } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUser);
router.get('/:userId', getUserWithPosts);

export default router;