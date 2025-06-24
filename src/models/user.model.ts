import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'principle' | 'teacher' | 'student';
}

const userSchema = new Schema<IUser>({
  name: {
     type: String,
     required: true
     },
  email: {
    type: String,
    required: true

  },
  password: {
     type: String,
     required: true
     },
  role: {
    type: String,
    enum: ['admin', 'principle', 'teacher', 'student'],
    default: 'student',
    required: true,
  },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
