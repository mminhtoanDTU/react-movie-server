import express from 'express';
import { getCurrentUser, login, register } from '../controllers/authController.js';
import { checkCurrentUser } from '../middlewares/checkCurrentUser.js'

const router = express.Router();

router.get('/', checkCurrentUser, getCurrentUser);
router.post('/register', register);
router.post('/login', login);


export default router;