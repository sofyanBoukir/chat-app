import { Router } from 'express';
import { login, logout, me, register } from '../controllers/auth.controller';
import { isAuthenticated } from '../isAuth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/isAuth',isAuthenticated,me);
router.post('/logout',logout);

export default router;
