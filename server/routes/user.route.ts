import { Router } from 'express';
import { isAuthenticated } from '../isAuth.middleware';
import { searchUsers, updateUserData } from '../controllers/user.controller';
import { upload } from '../multer'

const router = Router();
router.get('/searchUsers',isAuthenticated, searchUsers)
router.put('/update',isAuthenticated,upload.single('profile_picture'), updateUserData);

export default router;
