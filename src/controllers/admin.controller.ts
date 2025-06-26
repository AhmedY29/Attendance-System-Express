// import { Request, Response } from 'express';
// import * as adminService from '../services/admin.service'; 

// export const createUser = async (req: Request, res: Response) => {
//   try {
//     const newUser = await adminService.createUser(req.body);  
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user' });
//   }
// };

// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await adminService.getAllUsers();  
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching all users' });
//   }
// };

// export const getUserById = async (req: Request, res: Response) => {
//   try {
//     const user = await adminService.getUserById(req.params.id);  
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user by ID' });
//   }
// };

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const updatedUser = await adminService.updateUser(req.params.id, req.body);  
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating user' });
//   }
// };

// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const deletedUser = await adminService.deleteUser(req.params.id); 
//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting user' });
//   }
// };
