import mongoose, { Document, Schema } from 'mongoose';

export interface IClassStudent extends Document {
  classId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
}

const classStudentSchema = new Schema<IClassStudent>({
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const ClassStudent = mongoose.model<IClassStudent>('ClassStudent', classStudentSchema);
