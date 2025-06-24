import mongoose, { Document, Schema } from 'mongoose';

export interface IClassTeacher extends Document {
  classId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
}

const classTeacherSchema = new Schema<IClassTeacher>({
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const ClassTeacher = mongoose.model<IClassTeacher>('ClassTeacher', classTeacherSchema);
