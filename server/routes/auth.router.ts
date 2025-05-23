import { Router } from 'express';
import { login, me, register } from '../controllers/auth.controller';
import { isAuthenticated } from '../isAuth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/isAuth',isAuthenticated,me);
export default router;
