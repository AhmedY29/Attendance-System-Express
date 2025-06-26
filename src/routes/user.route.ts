
import express from 'express';
import * as userController from '../controllers/user.controller';
import { authorized } from '../middleware/auth.middleware';  
import { restrictTo } from '../middleware/auth.middleware';  

const router = express.Router();

router.post('/users', authorized, restrictTo('admin'), userController.createNewUser);  
router.post('/users/signin', userController.signIn);  
router.get('/users', authorized, userController.fetchAllUsers);  
router.get('/users', authorized, restrictTo('admin', 'teacher'), userController.fetchAllUsers);  
router.post('/assignStudent', authorized, restrictTo('admin'), userController.assignStudent);  
router.post('/assignTeacher', authorized, restrictTo('admin'), userController.assignTeacher);  
router.post('/assignPrincipal', authorized, restrictTo('admin'), userController.assignPrincipal);  
router.post('/deleteStudentClass', authorized, restrictTo('admin'), userController.deleteStudentClass);  
router.post('/deleteTeacherClass', authorized, restrictTo('admin'), userController.deleteTeacherClass);  
router.post('/deletePrincipalClass', authorized, restrictTo('admin'), userController.deletePrincipalClass);  
router.get('/users/:id', authorized, restrictTo('admin'), userController.fetchUserById);  
router.put('/users/:id', authorized, restrictTo('admin'), userController.modifyUser);  
router.delete('/users/:id', authorized, restrictTo('admin'), userController.removeUser);  

export default router;
