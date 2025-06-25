import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'principle' | 'teacher' | 'student';
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
      enum: ['admin', 'principle', 'teacher', 'student'],
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  
  try {
    const salt = await bcrypt.genSalt(10);  
    this.password = await bcrypt.hash(this.password, salt);  
    next();
  } catch (error: any) {
    return next(error);  
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);  
};

export const User = mongoose.model<IUser>('User', userSchema);
