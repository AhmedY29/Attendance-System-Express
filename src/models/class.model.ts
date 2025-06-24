import mongoose, { Document, Schema } from 'mongoose';

export interface IClass extends Document {
  name: string;
  description?: string;
  location?: string;
  capacity?: number;
  dateStartAt?: Date;
  dateEndAt?: Date;
  timeStartAt?: string;
  timeEndAt?: string;
}

const classSchema = new Schema<IClass>({
  name: { type: String, required: true },
  description: String,
  location: String,
  capacity: Number,
  dateStartAt: Date,
  dateEndAt: Date,
  timeStartAt: String,
  timeEndAt: String,
}, { timestamps: true });

export const Class = mongoose.model<IClass>('Class', classSchema);
