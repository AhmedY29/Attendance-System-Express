// /services/admin.service.ts
import { User } from '../models/user.model';

// 1. Admin: إنشاء مستخدم
export const createUser = async (data: any) => {
  const newUser = new User(data);  // إنشاء مستخدم جديد بناءً على البيانات التي أرسلها الـ Admin
  await newUser.save();
  return newUser;
};

// 2. Admin: الحصول على جميع المستخدمين
export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

// 3. Admin: الحصول على مستخدم واحد
export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

// 4. Admin: تحديث بيانات مستخدم
export const updateUser = async (id: string, updates: any) => {
  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
  return updatedUser;
};

// 5. Admin: حذف مستخدم
export const deleteUser = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};
