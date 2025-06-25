// // /routes/admin.routes.ts
// import express from 'express';
// import * as adminController from '../controllers/admin.controller';
// import { authMiddleware } from '../middleware/auth.middleware'; 
// import { roleMiddleware } from '../middleware/role.middleware';
// const router = express.Router();

// router.post('/users',authMiddleware, roleMiddleware('admin'), adminController.createUser);
// router.get('/users', authMiddleware, roleMiddleware('admin'), adminController.getAllUsers);
// router.get('/users/:id', authMiddleware, roleMiddleware('admin'), adminController.getUserById);
// router.put('/users/:id', authMiddleware, roleMiddleware('admin'), adminController.updateUser);
// router.delete('/users/:id', authMiddleware, roleMiddleware('admin'), adminController.deleteUser);

// export default router;

