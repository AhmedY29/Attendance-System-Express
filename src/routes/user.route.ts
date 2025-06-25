
import express from 'express';
import * as userController from '../controllers/user.controller';
import { authorized } from '../middleware/auth.middleware';  
import { restrictTo } from '../middleware/auth.middleware';  

const router = express.Router();

router.post('/users', authorized, restrictTo('admin'), userController.createNewUser);  
router.get('/users', authorized, restrictTo('admin'), userController.fetchAllUsers);  
router.get('/users/:id', authorized, restrictTo('admin'), userController.fetchUserById);  
router.put('/users/:id', authorized, restrictTo('admin'), userController.modifyUser);  
router.delete('/users/:id', authorized, restrictTo('admin'), userController.removeUser);  

export default router;
