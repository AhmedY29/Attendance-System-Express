
import express from 'express';
import * as userController from '../controllers/user.controller';
import { authorized } from '../middleware/auth.middleware';  
import { restrictTo } from '../middleware/auth.middleware';  

const router = express.Router();

router.post('/users', authorized, restrictTo('student', 'admin'), userController.createNewUser);  
router.post('/users/signin', userController.signIn);  
router.get('/users', authorized, restrictTo('admin', 'teacher', 'student'), userController.fetchAllUsers);  
router.get('/users', authorized, restrictTo('admin', 'teacher'), userController.fetchAllUsers);  
router.post('/assignStudent', authorized, restrictTo('admin'), userController.assignStudent);  
router.post('/assignTeacher', authorized, restrictTo('admin'), userController.assignTeacher);  
router.get('/users/:id', authorized, restrictTo('admin'), userController.fetchUserById);  
router.put('/users/:id', authorized, restrictTo('admin'), userController.modifyUser);  
router.delete('/users/:id', authorized, restrictTo('admin'), userController.removeUser);  

export default router;
