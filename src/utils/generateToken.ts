import JWT, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (userId: string, email: string, role: string) => {
  const token = JWT.sign(
    { userId, email, role},  
    process.env.JWT_SECRET as string,  
    { expiresIn: '1h' }  
  );

    return token
}

export const verifyToken = (token: string) => {
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET as string);
    return decoded as JwtPayload;  
  } catch (error) {
    throw new Error('Invalid or expired token');  
  }
};
