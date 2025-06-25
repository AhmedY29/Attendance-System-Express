import { Request, Response } from 'express';
import * as userService from '../services/user.service'; 

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await userService.login(email, password); 
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: 'Error logging in' });
  }
};
