import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'principal' | 'teacher' | 'student';
  comparePassword(candidatePassword: string): Promise<boolean>;  
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8, 
    },
    role: {
      type: String,
      enum: ['admin', 'principal', 'teacher', 'student'],
      default: 'student',
      required: true,
    },
  },
  {
    // timestamps: true, 
    toJSON: {
      virtuals: true,
      versionKey: false,  
      transform: function (doc, ret) {
        ret.id = ret._id; 
        delete ret._id;  
      },
    },
    toObject: {
      virtuals: true,
      versionKey: false,
      transform: function (doc, ret) {
        ret.id = ret._id; 
        delete ret._id;  
      },
    },
  }
);


export const User = mongoose.model<IUser>('User', userSchema);
