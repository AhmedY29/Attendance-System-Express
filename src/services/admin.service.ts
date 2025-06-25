// /services/admin.service.ts
import { User } from '../models/user.model';

export const createUser = async (data: any) => {
  const newUser = new User(data);  
  await newUser.save();
  return newUser;
};

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const updateUser = async (id: string, updates: any) => {
  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};
