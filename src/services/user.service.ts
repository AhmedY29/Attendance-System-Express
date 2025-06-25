import { AppError } from '../utils/error';
import { User } from '../models/user.model';  
import { BAD_REQUEST } from '../utils/http-status';
import bcrypt from 'bcryptjs';

interface CreateUserInput {
  email: string;
  password: string;
  role: 'admin' | 'principle' | 'teacher' | 'student';
}

interface CreateUserResponse {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const createUser = async (
  userData: CreateUserInput
): Promise<CreateUserResponse> => {
  const { email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User with this email already exists', BAD_REQUEST);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    email,
    password: hashedPassword,  
    role,
  });

  const savedUser = await newUser.save();

  return {
    id: savedUser.id,
    email: savedUser.email,
    role: savedUser.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const readUsers = async (): Promise<CreateUserResponse[]> => {
  const users = await User.find();
  return users.map((user) => ({
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
};

const readUser = async (userId: string): Promise<CreateUserResponse> => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError('User not found', BAD_REQUEST);
  }
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const updateUser = async (
  userId: string,
  updateData: Partial<CreateUserInput>
): Promise<CreateUserResponse> => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError('User not found', BAD_REQUEST);
  }

  if (updateData.email) user.email = updateData.email;
  if (updateData.password) user.password = await bcrypt.hash(updateData.password, 10);
  if (updateData.role) user.role = updateData.role;

  const updatedUser = await user.save();

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    role: updatedUser.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

const deleteUser = async (userId: string): Promise<void> => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new AppError('User not found', BAD_REQUEST);
  }
  
  await User.deleteOne({ _id: userId });  
};

export { createUser, readUsers, readUser, updateUser, deleteUser };

